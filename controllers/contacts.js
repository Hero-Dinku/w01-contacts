const { getDatabase } = require("../data/database");
const mongodb = require("mongodb");
const { ObjectId } = mongodb;

// GET all contacts
const getAll = async (req, res, next) => {
  try {
    const result = await getDatabase().collection("contacts").find();
    const contacts = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
};

// GET single contact by ID
const getSingle = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await getDatabase().collection("contacts").find({ _id: contactId });
    const contacts = await result.toArray();

    if (contacts.length === 0) {
      res.status(404).json({ error: "Contact not found." });
      return;
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch contact." });
  }
};

// POST - Create new contact
const createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ 
        error: "All fields are required: firstName, lastName, email, favoriteColor, birthday" 
      });
    }

    const contact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday: new Date(birthday)
    };

    const response = await getDatabase().collection("contacts").insertOne(contact);
    
    res.status(201).json({ 
      _id: response.insertedId,
      message: "Contact created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create contact." });
  }
};

// PUT - Update contact
const updateContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Check if contact exists
    const existingContact = await getDatabase().collection("contacts").findOne({ _id: contactId });
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (favoriteColor) updateData.favoriteColor = favoriteColor;
    if (birthday) updateData.birthday = new Date(birthday);

    const result = await getDatabase().collection("contacts").updateOne(
      { _id: contactId },
      { $set: updateData }
    );

    res.status(204).send(); // No content - successful update
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update contact." });
  }
};

// DELETE - Delete contact
const deleteContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);

    // Check if contact exists
    const existingContact = await getDatabase().collection("contacts").findOne({ _id: contactId });
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    const result = await getDatabase().collection("contacts").deleteOne({ _id: contactId });

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete contact." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
