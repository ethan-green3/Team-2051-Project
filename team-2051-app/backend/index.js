const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
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
    const sqlQuery = 'SELECT * FROM RFID_Tag';
  
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving products from the database.');
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  

// Get all categories
/*app.get('/categories', (req, res) => {
  const query = 'SELECT DISTINCT category FROM Inventory'; // Replace with your query for categories
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Failed to fetch categories' });
    } else {
      res.json(results.map((row) => ({ name: row.category }))); // Map results to format { name: 'CategoryName' }
    }
  });
});
*/
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
