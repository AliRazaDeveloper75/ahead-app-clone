const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Main documentation page
app.get('/', (req, res) => {
    const apiDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mind Thinker API Documentation</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #f4f7f6; }
            .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
            h2 { color: #2980b9; margin-top: 30px; }
            .warning { background: #fee2e2; border-left: 5px solid #ef4444; padding: 20px; margin-bottom: 30px; border-radius: 4px; }
            .warning h3 { margin-top: 0; color: #991b1b; }
            .warning p { color: #b91c1c; margin-bottom: 0; }
            .endpoint { background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 15px; }
            .method { display: inline-block; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 0.85rem; color: white; min-width: 70px; text-align: center; }
            .GET { background: #3b82f6; }
            .POST { background: #10b981; }
            .PUT { background: #f59e0b; }
            .path { font-family: monospace; font-size: 1.1rem; color: #2c3e50; margin-left: 10px; }
            .desc { margin-top: 10px; font-size: 0.95rem; }
            pre { background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 6px; overflow-x: auto; font-size: 0.85rem; margin-top: 10px; }
            details { cursor: pointer; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; background: white; }
            summary { font-weight: bold; color: #64748b; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Mind Thinker Backend Documentation</h1>
            
            <div class="warning">
                <h3>⚠️ Data Persistence Notice</h3>
                <p>On production (Vercel), the backend uses an <strong>ephemeral / temporary file system</strong>. This means any data saved to <code>data.json</code> or <code>/uploads</code> will be <strong>erased</strong> whenever the server instance scales down or restarts. To fix this permanently, you should migrate to a persistent database like <strong>MongoDB Atlas</strong>.</p>
            </div>

            <h2>Available Endpoints</h2>

            <div class="endpoint">
                <span class="method POST">POST</span> <span class="path">/api/assessment</span>
                <div class="desc">Save initial assessment results.</div>
                <details>
                    <summary>View Format</summary>
                    <pre>Body: { "email": "user@example.com", "results": { "id1": "answer1", ... } }</pre>
                </details>
            </div>

            <div class="endpoint">
                <span class="method POST">POST</span> <span class="path">/api/admin/login</span>
                <div class="desc">Admin dashboard authentication.</div>
                <details>
                    <summary>View Format</summary>
                    <pre>Body: { "username": "admin", "password": "..." }</pre>
                </details>
            </div>

            <div class="endpoint">
                <span class="method GET">GET</span> <span class="path">/api/admin/users</span>
                <div class="desc">Retrieve all users for admin review.</div>
                <details>
                    <summary>View Format</summary>
                    <pre>Returns: Array of User objects.</pre>
                </details>
            </div>

            <div class="endpoint">
                <span class="method PUT">PUT</span> <span class="path">/api/user/:email/profile</span>
                <div class="desc">Update user profile information (name, phone).</div>
                <details>
                    <summary>View Format</summary>
                    <pre>Body: { "name": "Jane Doe", "phone": "+1234..." }</pre>
                </details>
            </div>

            <div class="endpoint">
                <span class="method GET">GET</span> <span class="path">/api/user/:email/status</span>
                <div class="desc">Get current status and details of a single user.</div>
            </div>

            <div class="endpoint">
                <span class="method GET">GET</span> <span class="path">/api/debug/system</span>
                <div class="desc">Check environment and file system status.</div>
            </div>
        </div>
    </body>
    </html>
    `;
    res.send(apiDoc);
});

// Environment-aware paths
const isProduction = process.env.VERCEL === '1';
const BASE_DIR = isProduction ? '/tmp' : __dirname;
const DATA_FILE = path.join(BASE_DIR, 'data.json');
const UPLOADS_DIR = path.join(BASE_DIR, 'uploads');

// Ensure directories and data file exist
try {
    fs.ensureDirSync(UPLOADS_DIR);
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeJsonSync(DATA_FILE, {
            users: [],
            admins: [{ username: 'admin', password: 'admin123' }]
        });
    } else {
        const data = fs.readJsonSync(DATA_FILE);
        if (!data.admins) {
            data.admins = [{ username: 'admin', password: 'admin123' }];
            fs.writeJsonSync(DATA_FILE, data);
        }
    }
} catch (error) {
    console.warn('Filesystem warning:', error.message);
}

app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Helpers
const getData = () => fs.readJsonSync(DATA_FILE);
const saveData = (data) => fs.writeJsonSync(DATA_FILE, data);
const getUsers = () => getData().users;
const saveUsers = (users) => {
    const data = getData();
    data.users = users;
    saveData(data);
};

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const { admins } = getData();

    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
        res.json({ success: true, token: 'fake-jwt-token', username: admin.username });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});


// Save Assessment
app.post('/api/assessment', (req, res) => {
    const { email, results, name, phone } = req.body;
    const users = getUsers();
    let user = users.find(u => u.email === email);

    if (user) {
        if (user.status !== 'pending') {
            return res.status(400).json({ success: false, error: 'Email already registered with an active plan.' });
        }
        user.results = results;
        user.name = name || user.name;
        user.phone = phone || user.phone;
    } else {
        user = {
            email,
            name: name || '',
            phone: phone || '',
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

// Update User Profile
app.put('/api/user/:email/profile', (req, res) => {
    const { name, phone } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === req.params.email);

    if (user) {
        user.name = name || user.name;
        user.phone = phone || user.phone;
        saveUsers(users);
        res.json({ success: true, user });
    } else {
        res.status(404).json({ success: false, error: 'User not found' });
    }
});

// Admin: Get all users
app.get('/api/admin/users', (req, res) => {
    try {
        const users = getUsers();
        res.json(users);
    } catch (error) {
        console.error('Error in /api/admin/users:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve users.',
            reason: error.message,
            tip: isProduction ? 'Data might have been cleared due to ephemeral storage on Vercel.' : 'Check if data.json exists and is valid.'
        });
    }
});

// Admin: Get all admins
app.get('/api/admin/admins', (req, res) => {
    const { admins } = getData();
    res.json(admins.map(a => ({ username: a.username })));
});

// Admin: Create Super User
app.post('/api/admin/create-super-user', (req, res) => {
    const { username, password } = req.body;
    const data = getData();

    if (data.admins.find(a => a.username === username)) {
        return res.status(400).json({ success: false, error: 'Admin username already exists' });
    }

    data.admins.push({ username, password });
    saveData(data);
    res.json({ success: true, admins: data.admins.map(a => ({ username: a.username })) });
});

// Admin: Approve user
app.post('/api/admin/approve', (req, res) => {
    const { email } = req.body;
    try {
        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (user) {
            user.status = 'active';
            saveUsers(users);
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, error: 'User not found in system.' });
        }
    } catch (error) {
        console.error('Error in /api/admin/approve:', error);
        res.status(500).json({ success: false, error: 'Approval failed.', reason: error.message });
    }
});

// Debug endpoint to check environment
app.get('/api/debug/system', (req, res) => {
    res.json({
        isProduction,
        BASE_DIR,
        DATA_FILE_EXISTS: fs.existsSync(DATA_FILE),
        UPLOADS_DIR_EXISTS: fs.existsSync(UPLOADS_DIR),
        current_time: new Date().toISOString()
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
