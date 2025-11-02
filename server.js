const express = require('express');
const app = express();
const mongodb = require('./data/database'); // Database connection module
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000; // Use environment port or default to 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS middleware - allows requests from any origin (important for testing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any domain to access
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key' // Allowed headers
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
  next(); // Pass control to the next middleware
});

// Route configuration - all routes are defined in the routes folder
app.use('/', require('./routes')); 

// Initialize database connection and start server
mongodb.initDb((err) => {
  if (err) {
    console.log(err); // Log any database connection errors
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node Running on port ${port}`); // Success message
    });
  }
});