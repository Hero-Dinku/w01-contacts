const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

// GET /contacts - Retrieve all contacts
router.get("/", contactsController.getAll);

// GET /contacts/:id - Retrieve single contact by ID
router.get("/:id", contactsController.getSingle);

// POST /contacts - Create new contact
router.post("/", contactsController.createContact);

// PUT /contacts/:id - Update contact by ID
router.put("/:id", contactsController.updateContact);

// DELETE /contacts/:id - Delete contact by ID
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
