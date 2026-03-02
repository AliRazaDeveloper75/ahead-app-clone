import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProof, setSelectedProof] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditingUser, setIsEditingUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'users', 'payments', 'admins'
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null);
    const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
    const [creatingAdmin, setCreatingAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        if (!token) {
            navigate('/admin-login');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [usersRes, adminsRes] = await Promise.all([
                fetch('/api/admin/users'),
                fetch('/api/admin/admins')
            ]);

            if (usersRes.ok && adminsRes.ok) {
                const usersData = await usersRes.json();
                const adminsData = await adminsRes.json();
                setUsers(usersData);
                setAdmins(adminsData);
            } else {
                setError('Failed to fetch data from server');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Connection error. Please ensure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = fetchData; // Keep reference for existing calls

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setCreatingAdmin(true);
        try {
            const response = await fetch('/api/admin/create-super-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAdmin)
            });
            const data = await response.json();
            if (data.success) {
                alert('Super user created successfully!');
                setNewAdmin({ username: '', password: '' });
                fetchData();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Create admin error:', error);
            alert('Failed to connect to server');
        } finally {
            setCreatingAdmin(false);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/user/${isEditingUser.email}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: isEditingUser.name, phone: isEditingUser.phone })
            });
            const data = await response.json();
            if (data.success) {
                alert('User updated successfully!');
                setIsEditingUser(null);
                fetchData();
            }
        } catch (error) {
            console.error('Update user error:', error);
            alert('Failed to update user');
        }
    };

    const handleApprove = async (email) => {
        try {
            const response = await fetch('/api/admin/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (data.success) {
                alert('User approved!');
                fetchUsers();
            } else {
                alert(`Approval failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Approval error:', error);
            alert('An error occurred during approval.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin-token');
        navigate('/admin-login');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
        window.scrollTo(0, 0);
    };

    const stats = {
        totalUsers: users.length,
        activePlans: users.filter(u => u.status === 'active').length,
        pendingApproval: users.filter(u => u.status === 'awaiting_approval').length,
        revenue: users.filter(u => u.status === 'active').length * 19.60 // Example calculation
    };

    if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

    return (
        <div className={`admin-dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Sidebar Overlay */}
            <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <span className="logo-icon">🧠</span>
                    <h2>AdminMind</h2>
                </div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabChange('overview')}>
                        <span className="nav-icon">📊</span>
                        <span className="nav-label">Overview</span>
                    </button>
                    <button className={activeTab === 'users' ? 'active' : ''} onClick={() => handleTabChange('users')}>
                        <span className="nav-icon">👥</span>
                        <span className="nav-label">Users</span>
                    </button>
                    <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => handleTabChange('payments')}>
                        <span className="nav-icon">💳</span>
                        <span className="nav-label">Payments</span>
                    </button>
                    <button className={activeTab === 'admins' ? 'active' : ''} onClick={() => handleTabChange('admins')}>
                        <span className="nav-icon">🛡️</span>
                        <span className="nav-label">Super Users</span>
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="nav-icon">🚪</span>
                        <span className="nav-label">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="main-header">
                    <div className="header-left">
                        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(true)}>☰</button>
                        <h1>{
                            activeTab === 'overview' ? 'Dashboard Overview' :
                                activeTab === 'users' ? 'User Management' :
                                    activeTab === 'payments' ? 'Payment Requests' : 'Super User Management'
                        }</h1>
                    </div>
                    <div className="admin-profile desktop-only">
                        <span>Admin</span>
                        <div className="avatar">A</div>
                    </div>
                </header>

                <div className="content-area">
                    {error && (
                        <div className="admin-error-banner">
                            <span className="error-icon">⚠️</span>
                            <div className="error-text">
                                <h3>Data Loading Error</h3>
                                <p>{error}</p>
                                <button className="btn-retry" onClick={fetchUsers}>Retry Connection</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'overview' && !error && (
                        <motion.div
                            className="stats-grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="stat-card glass-card">
                                <div className="stat-header">
                                    <h3>Total Users</h3>
                                    <span className="stat-icon">👥</span>
                                </div>
                                <p className="stat-value">{stats.totalUsers}</p>
                                <div className="stat-trend up">
                                    <span>↑ 12%</span>
                                    <span className="stat-label">vs last month</span>
                                </div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-header">
                                    <h3>Active Plans</h3>
                                    <span className="stat-icon">⚡</span>
                                </div>
                                <p className="stat-value">{stats.activePlans}</p>
                                <div className="stat-trend up">
                                    <span>↑ 8%</span>
                                    <span className="stat-label">vs last month</span>
                                </div>
                            </div>
                            <div className="stat-card glass-card warning">
                                <div className="stat-header">
                                    <h3>Pending Approval</h3>
                                    <span className="stat-icon">⏳</span>
                                </div>
                                <p className="stat-value">{stats.pendingApproval}</p>
                                <div className="stat-trend warning">
                                    <span>Action Needed</span>
                                </div>
                            </div>
                            <div className="stat-card glass-card success">
                                <div className="stat-header">
                                    <h3>Est. Revenue</h3>
                                    <span className="stat-icon">💰</span>
                                </div>
                                <p className="stat-value">${stats.revenue.toFixed(0)}</p>
                                <div className="stat-trend up">
                                    <span>↑ 15%</span>
                                    <span className="stat-label">growth</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'admins' && !error && (
                        <motion.div
                            className="admins-container"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="admin-creation-card dashboard-card">
                                <h3>Create New Super User</h3>
                                <form onSubmit={handleCreateAdmin} className="admin-form">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            value={newAdmin.username}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                                            placeholder="Enter unique username"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            value={newAdmin.password}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                            placeholder="Enter strong password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary" disabled={creatingAdmin}>
                                        {creatingAdmin ? 'Creating...' : '➕ Add Super User'}
                                    </button>
                                </form>
                            </div>

                            <div className="admins-list-card dashboard-card">
                                <h3>Existing Super Users</h3>
                                <div className="admins-list">
                                    {admins.map((adm) => (
                                        <div key={adm.username} className="admin-item">
                                            <div className="admin-avatar">{adm.username[0].toUpperCase()}</div>
                                            <div className="admin-info">
                                                <strong>{adm.username}</strong>
                                                <span>Admin Account</span>
                                            </div>
                                            {adm.username !== 'admin' && (
                                                <span className="admin-tag">Super User</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {(activeTab === 'users' || activeTab === 'overview') && !error && (
                        <motion.div
                            className="table-container glass-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="table-header">
                                <h2>{activeTab === 'overview' ? 'Recent Users' : 'All Users'}</h2>
                                <button className="btn-refresh" onClick={fetchUsers} title="Refresh Data">🔄</button>
                            </div>
                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>User Info</th>
                                            <th>Contact</th>
                                            <th>Status</th>
                                            <th>Plan</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(activeTab === 'overview' ? users.slice(0, 5) : users).map((user) => (
                                            <tr key={user.email}>
                                                <td>{user.signupDate ? new Date(user.signupDate).toLocaleDateString() : 'N/A'}</td>
                                                <td>
                                                    <div className="user-info-col">
                                                        <strong>{user.name || 'No Name'}</strong>
                                                        <span>{user.email}</span>
                                                    </div>
                                                </td>
                                                <td>{user.phone || 'N/A'}</td>
                                                <td>
                                                    <span className={`status-pill ${user.status}`}>
                                                        {user.status === 'awaiting_approval' ? 'Pending' : user.status}
                                                    </span>
                                                </td>
                                                <td>{user.plan || 'N/A'}</td>
                                                <td className="actions-col">
                                                    <button className="btn-icon" title="View Assessment" onClick={() => setSelectedUser(user)}>📊</button>
                                                    <button className="btn-icon" title="Edit User" onClick={() => setIsEditingUser({ ...user })}>✏️</button>
                                                    {user.paymentProof && (
                                                        <button className="btn-icon" title="View Payment" onClick={() => setSelectedProof(`/uploads/${user.paymentProof}`)}>🖼️</button>
                                                    )}
                                                    {user.status === 'awaiting_approval' && (
                                                        <button className="btn-approve-small" onClick={() => handleApprove(user.email)}>✔ Approve</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="empty-row">No users found in the system.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'payments' && (
                        <motion.div
                            className="table-container glass-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="table-header">
                                <h2>Pending Approvals</h2>
                            </div>
                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Plan</th>
                                            <th>Proof</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.filter(u => u.status === 'awaiting_approval').map(user => (
                                            <tr key={user.email}>
                                                <td className="email-cell">{user.email}</td>
                                                <td>{user.plan}</td>
                                                <td>
                                                    <button className="btn-icon" onClick={() => setSelectedProof(`/uploads/${user.paymentProof}`)} title="View Proof">
                                                        🖼️
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn-approve-small" onClick={() => handleApprove(user.email)}>Approve</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {users.filter(u => u.status === 'awaiting_approval').length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="empty-row">No pending payments.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <AnimatePresence>
                {selectedProof && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProof(null)}
                    >
                        <motion.div
                            className="modal-content proof-view"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <header className="modal-header">
                                <h2>Payment Proof</h2>
                                <button className="close-btn" onClick={() => setSelectedProof(null)}>×</button>
                            </header>
                            <img src={selectedProof} alt="Payment Proof" />
                        </motion.div>
                    </motion.div>
                )}

                {selectedUser && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedUser(null)}
                    >
                        <motion.div
                            className="modal-content assessment-detail"
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <header className="modal-header">
                                <h2>Assessment Detail</h2>
                                <p><strong>{selectedUser.name || 'Anonymous'}</strong> ({selectedUser.email})</p>
                                <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
                            </header>
                            <div className="detail-scroll">
                                {Object.entries(selectedUser.results || {}).map(([id, answer]) => (
                                    <div key={id} className="detail-item">
                                        <span className="q-number">Question {id}</span>
                                        <div className="q-ans">
                                            {Array.isArray(answer) ? answer.join(', ') : answer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {isEditingUser && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsEditingUser(null)}
                    >
                        <motion.div
                            className="modal-content edit-modal"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <header className="modal-header">
                                <h2>Edit User Profile</h2>
                                <button className="close-btn" onClick={() => setIsEditingUser(null)}>×</button>
                            </header>
                            <form onSubmit={handleUpdateUser} className="edit-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={isEditingUser.name}
                                        onChange={(e) => setIsEditingUser({ ...isEditingUser, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input
                                        type="tel"
                                        value={isEditingUser.phone}
                                        onChange={(e) => setIsEditingUser({ ...isEditingUser, phone: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setIsEditingUser(null)}>Cancel</button>
                                    <button type="submit" className="btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
