import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProof, setSelectedProof] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'users', 'payments'
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        if (!token) {
            navigate('/admin-login');
            return;
        }
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
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
            }
        } catch (error) {
            console.error('Approval error:', error);
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
                        📊 Overview
                    </button>
                    <button className={activeTab === 'users' ? 'active' : ''} onClick={() => handleTabChange('users')}>
                        👥 Users
                    </button>
                    <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => handleTabChange('payments')}>
                        💳 Payments
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="main-header">
                    <div className="header-left">
                        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(true)}>☰</button>
                        <h1>{activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'users' ? 'User Management' : 'Payment Requests'}</h1>
                    </div>
                    <div className="admin-profile desktop-only">
                        <span>Admin</span>
                        <div className="avatar">A</div>
                    </div>
                </header>

                <div className="content-area">
                    {activeTab === 'overview' && (
                        <motion.div
                            className="stats-grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="stat-card">
                                <h3>Total Users</h3>
                                <p className="stat-value">{stats.totalUsers}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Active Plans</h3>
                                <p className="stat-value">{stats.activePlans}</p>
                            </div>
                            <div className="stat-card warning">
                                <h3>Pending Approval</h3>
                                <p className="stat-value">{stats.pendingApproval}</p>
                            </div>
                            <div className="stat-card success">
                                <h3>Est. Revenue</h3>
                                <p className="stat-value">${stats.revenue.toFixed(0)}</p>
                            </div>
                        </motion.div>
                    )}

                    {(activeTab === 'users' || activeTab === 'overview') && (
                        <motion.div
                            className="table-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="table-header">
                                <h2>{activeTab === 'overview' ? 'Recent Users' : 'All Users'}</h2>
                                <button className="btn-refresh" onClick={fetchUsers}>🔄</button>
                            </div>
                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Plan</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(activeTab === 'overview' ? users.slice(0, 5) : users).map((user) => (
                                            <tr key={user.email}>
                                                <td>{user.signupDate ? new Date(user.signupDate).toLocaleDateString() : 'N/A'}</td>
                                                <td className="email-cell">{user.email}</td>
                                                <td>
                                                    <span className={`status-pill ${user.status}`}>
                                                        {user.status === 'awaiting_approval' ? 'Pending' : user.status}
                                                    </span>
                                                </td>
                                                <td>{user.plan || 'N/A'}</td>
                                                <td className="actions-col">
                                                    <button className="btn-icon" onClick={() => setSelectedUser(user)}>📊</button>
                                                    {user.paymentProof && (
                                                        <button className="btn-icon" onClick={() => setSelectedProof(`/uploads/${user.paymentProof}`)}>🖼️</button>
                                                    )}
                                                    {user.status === 'awaiting_approval' && (
                                                        <button className="btn-approve-small" onClick={() => handleApprove(user.email)}>✔</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'payments' && (
                        <motion.div
                            className="table-container"
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
                                                    <button className="btn-view-text" onClick={() => setSelectedProof(`/uploads/${user.paymentProof}`)}>
                                                        View
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
                    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProof(null)}>
                        <motion.div className="modal-content proof-view" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}>
                            <img src={selectedProof} alt="Payment Proof" />
                            <button className="close-btn" onClick={() => setSelectedProof(null)}>×</button>
                        </motion.div>
                    </motion.div>
                )}

                {selectedUser && (
                    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedUser(null)}>
                        <motion.div className="modal-content assessment-detail" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} onClick={e => e.stopPropagation()}>
                            <header className="modal-header">
                                <h2>Assessment Detail</h2>
                                <p>{selectedUser.email}</p>
                            </header>
                            <div className="detail-scroll">
                                {Object.entries(selectedUser.results || {}).map(([id, answer]) => (
                                    <div key={id} className="detail-item">
                                        <span className="q-number">Q{id}</span>
                                        <div className="q-ans">
                                            {Array.isArray(answer) ? answer.join(', ') : answer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
