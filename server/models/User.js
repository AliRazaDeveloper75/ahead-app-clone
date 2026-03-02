const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    results: { type: Object, default: {} },
    status: { type: String, default: 'pending' },
    plan: { type: String, default: null },
    paymentMethod: { type: String, default: null },
    paymentProof: { type: String, default: null },
    transactionId: { type: String, default: null },
    completedTasks: { type: [String], default: [] },
    signupDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
