const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Database not available - using mock data:', err.message);
  } else {
    console.log('Database initialized');
  }
  
  // Use routes
  app.use('/', require('./routes'));

  app.listen(port, () => {
    console.log('Server running on port ' + port);
    console.log('API is now using proper MVC structure!');
    console.log('Test endpoints:');
    console.log('  http://localhost:' + port + '/');
    console.log('  http://localhost:' + port + '/contacts');
    console.log('  http://localhost:' + port + '/contacts/6907a225c6ebe24d47ebf88c');
  });
});
