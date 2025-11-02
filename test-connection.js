const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('✅ SUCCESS: Connected to MongoDB!');
        
        // Check if we can access the database and collection
        const database = client.db('cse341_project');
        console.log('✅ Database accessed:', database.databaseName);
        
        const collections = await database.listCollections().toArray();
        console.log('✅ Collections found:', collections.map(c => c.name));
        
        // Check if contacts collection exists and has data
        const contacts = database.collection('contacts');
        const count = await contacts.countDocuments();
        console.log('✅ Contacts count:', count);
        
        if (count > 0) {
            const sampleContact = await contacts.findOne();
            console.log('✅ Sample contact:', sampleContact);
        }
        
        await client.close();
        console.log('✅ Connection closed successfully');
        
    } catch (error) {
        console.log('❌ ERROR:', error.message);
    }
}

testConnection();
