const { getDatabase } = require('../data/database');
const mongodb = require('mongodb');

// Get all contacts - Handles GET /contacts requests
const getAll = async (req, res, next) => {
  // #swagger.tags = ['Contacts'] - Swagger documentation tag
  try {
    // Get all documents from the contacts collection
    const result = await getDatabase().collection('contacts').find();
    
    // Convert MongoDB cursor to array
    const contacts = await result.toArray();
    
    // Set response header and send JSON response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts); // Success response with contacts data
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: 'Failed to fetch contacts.' }); // Error response
  }
};

// Get single contact by ID - Handles GET /contacts/:id requests
const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Contacts'] - Swagger documentation tag
  try {
    // Convert string ID to MongoDB ObjectId
    const contactId = new mongodb.ObjectId(req.params.id);
    
    // Find contact by ID
    const result = await getDatabase().collection('contacts').find({ _id: contactId });
    const contacts = await result.toArray();

    // Check if contact was found
    if (contacts.length === 0) {
      res.status(404).json({ error: 'Contact not found.' }); // Not found response
      return;
    }

    // Return the found contact (first element in array)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]); // Success response with single contact
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: 'Failed to fetch contact.' }); // Error response
  }
};

// Export controller functions for use in routes
module.exports = {
  getAll,
  getSingle
};