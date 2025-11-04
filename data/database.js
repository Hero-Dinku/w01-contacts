const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;
const dbName = 'cse341_project';

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  // MongoDB connection options for Render compatibility
  const client = new MongoClient(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    serverSelectionTimeoutMS: 5000,
    retryWrites: true
  });

  client.connect()
    .then((client) => {
      database = client.db(dbName);
      console.log('✅ MongoDB Connected to', dbName);
      callback(null, database);
    })
    .catch((err) => {
      console.log('❌ MongoDB Connection Error:', err.message);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
