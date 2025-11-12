require('dotenv').config();
console.log('🔧 DEBUG: Environment check');
const express = require('express');
const app = express();
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', require('./routes'));
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});
app.listen(port, () => {
  console.log('🚀 Server started on port ' + port);
  mongodb.initDb((err) => {
    if (err) console.log('⚠️ DB failed');
    else console.log('✅ DB connected');
  });
});
