const router = require('express').Router();

// Swagger documentation route (to be implemented in Week 2)
router.use('/', require('./swagger'));

// All contacts-related routes are handled in contacts.js
router.use('/contacts', require('./contacts'));

module.exports = router;