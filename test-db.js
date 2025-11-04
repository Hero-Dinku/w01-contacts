const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testDB() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('✅ MongoDB Connected!');
        
        const db = client.db('cse341_project');
        const contacts = db.collection('contacts');
        const count = await contacts.countDocuments();
        console.log('✅ Contacts count:', count);
        
        await client.close();
    } catch (error) {
        console.log('❌ MongoDB Error:', error.message);
    }
}

testDB();
