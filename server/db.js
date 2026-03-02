const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    try {
        // In serverless, we want to maintain the connection if possible
        cachedConnection = await mongoose.connect(MONGODB_URI, {
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('Successfully connected to MongoDB');
        return cachedConnection;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw error;
    }
};

module.exports = connectDB;
