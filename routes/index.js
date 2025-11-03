const router = require('express').Router();

// All contacts-related routes
router.use('/contacts', require('./contacts'));

// Root route
router.get('/', (req, res) => {
  res.send('Contacts API is running! (With proper structure)');
});

module.exports = router;
