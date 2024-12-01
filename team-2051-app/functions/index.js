const functions = require('firebase-functions');
const express = require('express');
const mysql = require('mysql');

// Initialize Express app
const app = express();

// MySQL database configuration (from Firebase environment variables)
const dbConfig = {
  host: functions.config().rds.host,
  user: functions.config().rds.user,
  password: functions.config().rds.password,
  database: functions.config().rds.database,
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection when the function is initialized
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Database connection established successfully.');
    connection.release(); // Release the connection back to the pool
  }
});

// Route to fetch products
app.get('/fetchProducts', (req, res) => {
  const query = 'SELECT * FROM RFID_Tag'; // Query to fetch all products
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).send({ error: 'Failed to fetch products' });
    }
    console.log('Fetched products successfully.');
    res.status(200).json(results); // Return the products as JSON
  });
});

// Export the function to Firebase
exports.fetchProducts = functions.https.onRequest(app);
