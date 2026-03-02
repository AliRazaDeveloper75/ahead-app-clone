const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async () => {
    // 1. Return if already connected
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // 2. Return the existing connection attempt if one is in progress
    if (cachedPromise) {
        return cachedPromise;
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    try {
        console.log('🔄 Attemping to connect to MongoDB...');

        // 3. Store the promise so concurrent calls reuse it
        cachedPromise = mongoose.connect(MONGODB_URI, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            heartbeatFrequencyMS: 10000,
        });

        const connection = await cachedPromise;
        console.log('✅ Successfully connected to MongoDB');
        return connection;
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        cachedPromise = null; // Reset so the next request can try again
        throw error;
    }
};

module.exports = connectDB;
