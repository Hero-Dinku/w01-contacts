const { MongoClient } = require('mongodb');

let database;
const dbName = 'cse341_project';

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  const connectionString = process.env.MONGODB_URI;
  
  if (!connectionString) {
    console.log('❌ MONGODB_URI is not set in environment variables');
    return callback(new Error('MONGODB_URI not set'), null);
  }

  console.log('🔗 Attempting MongoDB connection...');

  const client = new MongoClient(connectionString);

  client.connect()
    .then((client) => {
      database = client.db(dbName);
      console.log('✅ MongoDB Connected successfully to', dbName);
      callback(null, database);
    })
    .catch((err) => {
      console.log('❌ MongoDB Connection Failed:', err.message);
      console.log('💡 Check your MONGODB_URI in Render environment variables');
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
