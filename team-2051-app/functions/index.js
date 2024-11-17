const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Accessing configuration values
const rdsConfig = functions.config().rds;

console.log('RDS Host:', rdsConfig.host); // This line is for debugging and can be removed later

// Make sure to safely handle undefined values
if (!rdsConfig || !rdsConfig.host) {
  throw new Error('RDS configuration is not set correctly.');
}

// Example connection (assuming you are using a MySQL library):
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: rdsConfig.host,
  user: rdsConfig.user,
  password: rdsConfig.password,
  database: rdsConfig.database,
});

// Perform any database operations here
