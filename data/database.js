// Simple database module - we'll add real connection later
const getDatabase = () => {
  return null; // Return null for now since we're using mock data
};

const initDb = (callback) => {
  console.log('Database initialization skipped - using mock data');
  callback(null, null);
};

module.exports = {
  initDb,
  getDatabase
};
