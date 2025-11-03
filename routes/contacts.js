const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET /contacts - Retrieve all contacts
router.get('/', contactsController.getAll);

// GET /contacts/:id - Retrieve a single contact by ID
router.get('/:id', contactsController.getSingle);

module.exports = router;
