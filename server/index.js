const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();
const connectDB = require('./db');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize Database Connection
let lastDbError = null;
connectDB().catch(err => {
    lastDbError = err.message;
});

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

// Migration Logic: JSON to MongoDB
const migrateData = async () => {
    if (!fs.existsSync(DATA_FILE) || !MONGODB_URI) return;

    try {
        const data = await fs.readJson(DATA_FILE);
        console.log('Starting migration from data.json to MongoDB...');

        // Migrate Admins
        if (data.admins && data.admins.length > 0) {
            for (const adm of data.admins) {
                await Admin.findOneAndUpdate(
                    { username: adm.username },
                    { password: adm.password },
                    { upsert: true, new: true }
                );
            }
            console.log(`Migrated ${data.admins.length} admins.`);
        }

        // Migrate Users
        if (data.users && data.users.length > 0) {
            for (const u of data.users) {
                await User.findOneAndUpdate(
                    { email: u.email },
                    u,
                    { upsert: true, new: true }
                );
            }
            console.log(`Migrated ${data.users.length} users.`);
        }

        // Rename legacy file to prevent re-migration
        await fs.rename(DATA_FILE, DATA_FILE + '.bak');
        console.log('Migration complete. data.json backed up to data.json.bak');
    } catch (error) {
        console.error('Migration Error:', error.message);
    }
};

// Default Admin Creation
const ensureDefaultAdmin = async () => {
    try {
        const count = await Admin.countDocuments();
        if (count === 0) {
            const defaultAdmin = new Admin({ username: 'admin', password: 'admin123' });
            await defaultAdmin.save();
            console.log('Default admin created: admin/admin123');
        }
    } catch (error) {
        console.error('Error ensuring default admin:', error.message);
    }
};

// Ensure directories exist
try {
    fs.ensureDirSync(UPLOADS_DIR);
} catch (error) {
    console.warn('Filesystem warning:', error.message);
}

// Run migration if connected
if (MONGODB_URI) {
    migrateData().then(() => ensureDefaultAdmin());
}

app.use('/uploads', express.static(UPLOADS_DIR));

// Storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        await connectDB();
    } catch (err) {
        return res.status(503).json({
            success: false,
            error: 'Database not connected.',
            tip: 'CRITICAL: Ensure 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access. Vercel IPs are dynamic.'
        });
    }

    try {
        const admin = await Admin.findOne({ username, password });
        if (admin) {
            res.json({ success: true, token: 'fake-jwt-token', username: admin.username });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Login failed', reason: error.message });
    }
});


// Save Assessment
app.post('/api/assessment', async (req, res) => {
    const { email, results, name, phone } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            if (user.status !== 'pending') {
                return res.status(400).json({ success: false, error: 'Email already registered with an active plan.' });
            }
            user.results = results;
            user.name = name || user.name;
            user.phone = phone || user.phone;
            await user.save();
        } else {
            user = new User({
                email,
                name: name || '',
                phone: phone || '',
                results,
                status: 'pending',
                signupDate: new Date()
            });
            await user.save();
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Assessment save failed', reason: error.message });
    }
});

// Manual Payment
app.post('/api/payment/manual', upload.single('screenshot'), async (req, res) => {
    const { email, transactionId, plan } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            user.plan = plan;
            user.paymentMethod = 'manual';
            user.transactionId = transactionId;
            user.paymentProof = req.file.filename;
            user.status = 'awaiting_approval';
            await user.save();
            res.json({ success: true, user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Payment submission failed', reason: error.message });
    }
});

// Online Payment
app.post('/api/payment/online', async (req, res) => {
    const { email, plan } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            user.plan = plan;
            user.paymentMethod = 'online';
            user.status = 'active';
            await user.save();
            res.json({ success: true, user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Payment processing failed', reason: error.message });
    }
});

// Get User Status
app.get('/api/user/:email/status', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Status check failed', reason: error.message });
    }
});

// Update Completed Tasks
app.post('/api/user/:email/tasks', async (req, res) => {
    const { taskId } = req.body;
    try {
        const user = await User.findOne({ email: req.params.email });

        if (user && user.status === 'active') {
            if (!user.completedTasks.includes(taskId)) {
                user.completedTasks.push(taskId);
                await user.save();
            }
            res.json({ success: true, completedTasks: user.completedTasks });
        } else {
            res.status(403).json({ error: 'Unauthorised or plan not active' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Task update failed', reason: error.message });
    }
});

// Update User Profile
app.put('/api/user/:email/profile', async (req, res) => {
    const { name, phone } = req.body;
    try {
        const user = await User.findOne({ email: req.params.email });

        if (user) {
            user.name = name || user.name;
            user.phone = phone || user.phone;
            await user.save();
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Profile update failed', reason: error.message });
    }
});

// Admin: Get all users
app.get('/api/admin/users', async (req, res) => {
    try {
        await connectDB();
    } catch (err) {
        return res.status(503).json({
            success: false,
            error: 'Database not connected.',
            tip: 'Ensure 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.'
        });
    }
    try {
        const users = await User.find().sort({ signupDate: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error in /api/admin/users:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve users.',
            reason: error.message,
            tip: isProduction ? 'Check database connection and permissions.' : 'Database might be empty or connection failed.'
        });
    }
});

// Admin: Get all admins
app.get('/api/admin/admins', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            error: 'Database not connected.',
            tip: 'Ensure MONGODB_URI is set in Vercel environment variables.'
        });
    }
    try {
        const admins = await Admin.find({}, { password: 0 }); // Don't return passwords
        res.json(admins);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to retrieve admins', reason: error.message });
    }
});

// Admin: Create Super User
app.post('/api/admin/create-super-user', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existing = await Admin.findOne({ username });
        if (existing) {
            return res.status(400).json({ success: false, error: 'Admin username already exists' });
        }

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        const admins = await Admin.find({}, { password: 0 });
        res.json({ success: true, admins });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Admin creation failed', reason: error.message });
    }
});

// Admin: Approve user
app.post('/api/admin/approve', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            user.status = 'active';
            await user.save();
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
app.get('/api/debug/system', async (req, res) => {
    try {
        await connectDB();
    } catch (err) {
        lastDbError = err.message;
    }

    const rawUri = process.env.MONGODB_URI || '';
    let redactedUri = 'NOT_PRESENT';
    let uriFormatInfo = 'N/A';

    if (rawUri) {
        // Redact password: keep protocol and host, hide credentials
        redactedUri = rawUri.replace(/:([^@]+)@/, ':****@');
        uriFormatInfo = {
            hasProtocol: rawUri.includes('mongodb+srv://') || rawUri.includes('mongodb://'),
            hasCredentials: rawUri.includes(':') && rawUri.includes('@'),
            hasDatabase: rawUri.split('/').length > 3 && rawUri.split('/')[3].split('?')[0].length > 0,
            isPlaceholder: rawUri.includes('<password>') || rawUri.includes('your_')
        };
    }

    res.json({
        isProduction,
        BASE_DIR,
        DATA_FILE_EXISTS: fs.existsSync(DATA_FILE),
        DATA_BAK_EXISTS: fs.existsSync(DATA_FILE + '.bak'),
        UPLOADS_DIR_EXISTS: fs.existsSync(UPLOADS_DIR),
        MONGODB_CONNECTED: mongoose.connection.readyState === 1,
        MONGODB_READY_STATE: mongoose.connection.readyState,
        MONGODB_URI_PRESENT: !!process.env.MONGODB_URI,
        MONGODB_URI_REDACTED: redactedUri,
        MONGODB_URI_FORMAT: uriFormatInfo,
        MONGODB_LAST_ERROR: lastDbError,
        VERSION_ID: 'debug-v5-serverless-optimized',
        current_time: new Date().toISOString()
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
