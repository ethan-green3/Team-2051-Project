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
  const sqlQuery = `
    SELECT 
      rfid.tag_number, 
      rfid.sku, 
      rfid.quantity, 
      prod.product_name 
    FROM 
      RFID_Tag rfid
    LEFT JOIN 
      Product prod 
    ON 
      rfid.sku = prod.sku
  `;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving products from the database.');
    } else {
      res.status(200).json(results);
      logProductFetch(results.length);
    }
  });
});

function logProductFetch(totalProducts) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Fetched ${totalProducts} products from the database.`);
}

// DELETE route to delete a product by SKU
app.delete('/products/:sku', (req, res) => {
  const { sku } = req.params; // Extract SKU from the URL
  const sqlQuery = 'DELETE FROM RFID_Tag WHERE sku = ?'; // SQL query to delete the product

  db.query(sqlQuery, [sku], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error deleting the product from the database.');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Product not found.');
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


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
