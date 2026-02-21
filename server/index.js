const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories and data file exist
fs.ensureDirSync(UPLOADS_DIR);
if (!fs.existsSync(DATA_FILE)) {
    fs.writeJsonSync(DATA_FILE, { users: [] });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Helper to get all users
const getUsers = () => fs.readJsonSync(DATA_FILE).users;

// Helper to save users
const saveUsers = (users) => fs.writeJsonSync(DATA_FILE, { users });

// Save Assessment
app.post('/api/assessment', (req, res) => {
    const { email, results } = req.body;
    const users = getUsers();
    let user = users.find(u => u.email === email);

    if (user) {
        // If user exists and is already beyond 'pending' or 'awaiting_approval', don't allow re-submission
        if (user.status !== 'pending') {
            return res.status(400).json({ success: false, error: 'Email already registered with an active plan.' });
        }
        user.results = results;
    } else {
        user = {
            email,
            results,
            status: 'pending',
            plan: null,
            paymentMethod: null,
            paymentProof: null,
            completedTasks: [],
            signupDate: new Date()
        };
        users.push(user);
    }

    saveUsers(users);
    res.json({ success: true, user });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded for demo/user requirement
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// Manual Payment
app.post('/api/payment/manual', upload.single('screenshot'), (req, res) => {
    const { email, transactionId, plan } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        user.plan = plan;
        user.paymentMethod = 'manual';
        user.transactionId = transactionId;
        user.paymentProof = req.file.filename;
        user.status = 'awaiting_approval';
        saveUsers(users);
        res.json({ success: true, user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Online Payment
app.post('/api/payment/online', (req, res) => {
    const { email, plan } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        user.plan = plan;
        user.paymentMethod = 'online';
        user.status = 'active';
        saveUsers(users);
        res.json({ success: true, user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Get User Status
app.get('/api/user/:email/status', (req, res) => {
    const users = getUsers();
    const user = users.find(u => u.email === req.params.email);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ success: false, error: 'User not found' });
    }
});

// Update Completed Tasks
app.post('/api/user/:email/tasks', (req, res) => {
    const { taskId } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === req.params.email);

    if (user && user.status === 'active') {
        if (!user.completedTasks.includes(taskId)) {
            user.completedTasks.push(taskId);
            saveUsers(users);
        }
        res.json({ success: true, completedTasks: user.completedTasks });
    } else {
        res.status(403).json({ error: 'Unauthorised or plan not active' });
    }
});

// Admin: Get all users
app.get('/api/admin/users', (req, res) => {
    res.json(getUsers());
});

// Admin: Approve user
app.post('/api/admin/approve', (req, res) => {
    const { email } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        user.status = 'active';
        saveUsers(users);
        res.json({ success: true, user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
