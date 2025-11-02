const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file

let database; // Global variable to store database connection
const dbName = 'cse341_project'; // Database name in MongoDB

// Initialize database connection
const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!'); // Prevent multiple connections
    return callback(null, database);
  }
  
  // Connect to MongoDB using connection string from environment variables
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db(dbName); // Store database instance
      callback(null, database); // Return database via callback
    })
    .catch((err) => {
      callback(err); // Return error if connection fails
    });
};

// Get the database instance (throws error if not initialized)
const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized'); // Safety check
  }
  return database;
};

// Export functions for use in other files
module.exports = {
  initDb,
  getDatabase
};