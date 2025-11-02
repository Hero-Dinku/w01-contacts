const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts'); // Import controller functions

// GET /contacts - Retrieve all contacts from the database
router.get('/', contactsController.getAll);

// GET /contacts/:id - Retrieve a single contact by ID
router.get('/:id', contactsController.getSingle);

// POST, PUT, and DELETE endpoints will be added in Week 2

module.exports = router;