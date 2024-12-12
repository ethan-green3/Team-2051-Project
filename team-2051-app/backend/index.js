const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json()); // For parsing JSON bodies

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Routes

// Get all products
app.get('/products', (req, res) => {
  // Update availability status based on the last five scans
  const updateQuery = `
    UPDATE Inventory
    SET availability_status = 0
    WHERE tag_number IN (
        SELECT tag_number
        FROM (
            SELECT tag_number
            FROM Inventory
            WHERE last_scanned < (
                SELECT MIN(timestamp)
                FROM (
                    SELECT DISTINCT timestamp
                    FROM Reader_Activity_Log
                    ORDER BY timestamp DESC
                    LIMIT 6
                ) AS last_five_scans
            )
        ) AS temp
    );
  `;

  db.query(updateQuery, (updateErr) => {
    if (updateErr) {
      console.error('Error updating availability status:', updateErr);
      res.status(500).send('Error updating inventory status.');
      return;
    }

    // Fetch updated product data after updating the status
    const sqlQuery = `
      SELECT 
        inv.tag_number, 
        rfid.sku, 
        inv.availability_status, 
        prod.product_name,
        inv.last_scanned
      FROM 
        Inventory inv
      LEFT JOIN 
        RFID_Tag rfid 
      ON 
        inv.tag_number = rfid.tag_number
      LEFT JOIN 
        Product prod 
      ON 
        rfid.sku = prod.sku
    `;

    db.query(sqlQuery, (fetchErr, results) => {
      if (fetchErr) {
        console.error('Error executing query:', fetchErr);
        res.status(500).send('Error retrieving products from the database.');
      } else {
        res.status(200).json(results);
        logProductFetch(results.length); // Log the number of fetched products
      }
    });
  });
});

app.get('/products/missing', (req, res) => {
  const sqlQuery = `
   SELECT rfid.tag_number, 
           rfid.sku, 
           rfid.quantity, 
           prod.product_name, 
           inv.last_scanned
    FROM Inventory inv
    LEFT JOIN RFID_Tag rfid ON inv.tag_number = rfid.tag_number
    LEFT JOIN Product prod ON rfid.sku = prod.sku
    WHERE inv.last_scanned IS NULL
       OR TIMESTAMPDIFF(MINUTE, inv.last_scanned, CONVERT_TZ(NOW(), '+00:00', '-06:00')) > 2;
  `;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching missing products:', err);
      res.status(500).send('Error fetching missing products');
      return;
    }
    res.status(200).json(results);
  });
});


app.get('/products/checked-in', (req, res) => {
  const sqlQuery = `
      SELECT 
        rt.tag_number,
        rt.sku,
        p.product_name,
        i.availability_status
    FROM 
        RFID_Tag rt
    LEFT JOIN 
        Product p ON rt.sku = p.sku
    LEFT JOIN 
        Inventory i ON rt.tag_number = i.tag_number
    WHERE 
        p.product_name IS NOT NULL
        AND rt.tag_number != '000000000000000000000000'
    ORDER BY 
        i.availability_status ASC`;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching missing products:', err);
      res.status(500).send('Error fetching missing products');
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/check-out', (req, res) => {
  console.log("POST /check-out route registered");
  const { rfidTag } = req.body;
  if (!rfidTag) {
    res.status(400).send('RFID Tag number is required.');
    return;
  }

  const sqlQuery = `
    DELETE FROM RFID_Tag 
    WHERE tag_number = ?;
  `;

  db.query(sqlQuery, [rfidTag], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product.');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Product with the specified RFID Tag not found.');
    } else {
      res.status(200).send('Product removed from the system successfully.');
    }
  });
});





function logProductFetch(totalProducts) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Fetched ${totalProducts} products from the database.`);
}

// DELETE route to delete a product by Tag Number
app.delete('/products/:tagNumber', (req, res) => {
  const { tagNumber } = req.params; // Extract Tag Number from the URL
  const sqlQuery = 'DELETE FROM RFID_Tag WHERE tag_number = ?'; // SQL query to delete the product by Tag Number

  db.query(sqlQuery, [tagNumber], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error deleting the product from the database.');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Product with the specified Tag Number not found.');
    } else {
      res.status(200).send('Product deleted successfully.');
    }
  });
});

// Update quantity of a product by SKU
app.put('/products/:sku', (req, res) => {
  const { sku } = req.params;
  const { quantity } = req.body;

  if (!quantity || isNaN(quantity)) {
    return res.status(400).send('Invalid quantity.');
  }

  const sqlQuery = 'UPDATE RFID_Tag SET quantity = ? WHERE sku = ?';

  db.query(sqlQuery, [quantity, sku], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error updating product quantity in the database.');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Product not found.');
    } else {
      res.status(200).send('Product quantity updated successfully.');
    }
  });
});

app.post('/check-in', (req, res) => {
  console.log('Request Body:', req.body);
  const { barcode, rfidTags } = req.body; // Expecting an array of RFID tags
  if (!barcode || !Array.isArray(rfidTags) || rfidTags.length === 0) {
    console.error('Invalid request data:', req.body);
    return res.status(400).send('Barcode and at least one RFID Tag are required.');
  }

  const queryGetSKU = 'SELECT sku FROM Product WHERE barcode = ?';
  const queryInsertTag = 'INSERT INTO RFID_Tag (tag_number, sku, quantity) VALUES (?, ?, ?)';

  // Step 1: Retrieve the SKU from the Product table based on the barcode
  db.query(queryGetSKU, [barcode], (err, results) => {
    if (err) {
      console.error('Error fetching SKU:', err);
      return res.status(500).send('Error fetching SKU from the database.');
    }

    if (results.length === 0) {
      return res.status(404).send('No product found with the given barcode.');
    }

    const sku = results[0].sku;

    // Step 2: Insert each RFID tag into the RFID_Tag table
    const insertPromises = rfidTags.map((tag) => {
      return new Promise((resolve, reject) => {
        db.query(queryInsertTag, [tag, sku, 1], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    // Execute all insertions
    Promise.all(insertPromises)
      .then(() => {
        res.status(200).send('All RFID tags have been checked in successfully.');
      })
      .catch((err) => {
        console.error('Error inserting RFID tags:', err);
        res.status(500).send('Error checking in RFID tags.');
      });
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
