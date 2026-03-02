const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('❌ MONGODB_URI is not defined in .env');
        process.exit(1);
    }

    console.log('🔍 Testing connection to MongoDB Atlas...');
    console.log('URI Format Check:');
    console.log('- Protocol included:', uri.startsWith('mongodb+srv://') || uri.startsWith('mongodb://'));
    console.log('- Database included:', uri.split('/').length > 3 && uri.split('/')[3].split('?')[0].length > 0);

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000
        });

        console.log('✅ Connection Successful!');

        // Perform a real operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`✅ Database Reachable! Found ${collections.length} collections.`);

        if (collections.length > 0) {
            console.log('Collections list:', collections.map(c => c.name).join(', '));
        } else {
            console.log('No collections found (empty database).');
        }

        await mongoose.disconnect();
        console.log('👋 Test finished successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection Failed!');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);

        if (err.message.includes('authentication failed')) {
            console.error('💡 TIP: Your username or password in .env is incorrect.');
        } else if (err.message.includes('queryTxt ETIMEOUT') || err.message.includes('ECONNREFUSED')) {
            console.error('💡 TIP: This is usually a networking or IP whitelist issue.');
        }

        process.exit(1);
    }
};

testConnection();