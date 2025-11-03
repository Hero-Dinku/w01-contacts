// Get all contacts
const getAll = async (req, res, next) => {
  try {
    // Mock data
    const mockContacts = [
      {
        _id: '6907a225c6ebe24d47ebf88c',
        firstName: 'Asmamaw',
        lastName: 'Dinku',
        email: 'asmamaw.dinku@email.com',
        favoriteColor: 'Blue',
        birthday: '1995-03-15T00:00:00.000Z'
      }
    ];
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(mockContacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
};

// Get single contact by ID
const getSingle = async (req, res, next) => {
  try {
    const mockContacts = [
      {
        _id: '6907a225c6ebe24d47ebf88c',
        firstName: 'Asmamaw',
        lastName: 'Dinku',
        email: 'asmamaw.dinku@email.com',
        favoriteColor: 'Blue',
        birthday: '1995-03-15T00:00:00.000Z'
      }
    ];
    
    const contact = mockContacts.find(c => c._id === req.params.id);
    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch contact.' });
  }
};

module.exports = {
  getAll,
  getSingle
};
