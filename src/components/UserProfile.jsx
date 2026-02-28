import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: '', phone: '' });
    const [saving, setSaving] = useState(false);

    const email = localStorage.getItem('mind-thinker-user');

    useEffect(() => {
        if (!email) {
            navigate('/try-now');
            return;
        }
        fetchUserStatus();
    }, [email]);

    const fetchUserStatus = async () => {
        try {
            const response = await fetch(`/api/user/${email}/status`);
            const data = await response.json();
            setUser(data);
            setEditData({ name: data.name || '', phone: data.phone || '' });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch(`/api/user/${email}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="dashboard-loading">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="loader-icon"
            >🧠</motion.div>
            <p>Analyzing your growth path...</p>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="user-dashboard-page">
            <div className="dashboard-bg-decor">
                <div className="bg-circle c1"></div>
                <div className="bg-circle c2"></div>
            </div>

            <div className="container">
                <motion.header
                    className="profile-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="profile-identity">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar">
                                {user.name ? user.name[0].toUpperCase() : '👤'}
                            </div>
                            <div className="status-dot"></div>
                        </div>
                        <div className="profile-info">
                            <h1>Welcome back, {user.name || user.email.split('@')[0]}!</h1>
                            <p className="email-tag">{user.email}</p>
                            <span className="join-date">Member since {user.signupDate ? new Date(user.signupDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                    <button className="btn btn-glass edit-btn" onClick={() => setIsEditing(true)}>
                        ⚙️ Edit Profile
                    </button>
                </motion.header>

                <div className="dashboard-main-grid">
                    {/* Growth Progress Card */}
                    <motion.div className="dashboard-card main-stat-card" variants={itemVariants} initial="hidden" animate="visible">
                        <div className="stat-circle-container">
                            <svg className="stat-ring" viewBox="0 0 100 100">
                                <circle className="ring-bg" cx="50" cy="50" r="45" />
                                <motion.circle
                                    className="ring-fill"
                                    cx="50" cy="50" r="45"
                                    initial={{ strokeDasharray: "0 283" }}
                                    animate={{ strokeDasharray: `${((user.completedTasks?.length || 0) / 28) * 283} 283` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="stat-value">
                                <h2>{Math.round(((user.completedTasks?.length || 0) / 28) * 100)}%</h2>
                                <p>Overall Journey</p>
                            </div>
                        </div>
                        <div className="stat-details">
                            <div className="stat-box">
                                <strong>{user.completedTasks?.length || 0}</strong>
                                <span>Days Completed</span>
                            </div>
                            <div className="stat-box">
                                <strong>28</strong>
                                <span>Total Goal</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Personal Info & Plan Card */}
                    <div className="dashboard-col">
                        <motion.div className="dashboard-card info-card" variants={itemVariants} initial="hidden" animate="visible">
                            <h3>Personal Details</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Full Name</span>
                                    <span className="value">{user.name || 'Not set'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Phone Number</span>
                                    <span className="value">{user.phone || 'Not set'}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="dashboard-card plan-card" variants={itemVariants} initial="hidden" animate="visible">
                            <h3>Current Plan</h3>
                            <div className={`plan-status-pill ${user.status}`}>
                                {user.status === 'active' ? '✨ Active Plan' : '⏳ Pending Approval'}
                            </div>
                            <div className="plan-details">
                                <h4>{user.plan ? user.plan.replace('-', ' ') : 'Standard EQ Boost'}</h4>
                                <p>Exclusive emotional intelligence exercises and tracking.</p>
                            </div>
                            <button
                                className={`btn w-100 ${user.status === 'active' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => navigate(user.status === 'active' ? '/dashboard' : '/plan')}
                            >
                                {user.status === 'active' ? 'Resume Plan' : 'Check Plan Details'}
                            </button>
                        </motion.div>
                    </div>

                    {/* Emotional Metrics Card */}
                    <motion.div className="dashboard-card metrics-card" variants={itemVariants} initial="hidden" animate="visible">
                        <h3>Growth Metrics</h3>
                        <div className="metrics-grid">
                            {[
                                { label: 'Self Awareness', val: '88%', col: '#6b46c1' },
                                { label: 'Social Skills', val: '72%', col: '#3182ce' },
                                { label: 'Motivation', val: '94%', col: '#38a169' },
                                { label: 'Empathy', val: '78%', col: '#e53e3e' }
                            ].map((m, idx) => (
                                <div key={idx} className="metric-item">
                                    <div className="metric-header">
                                        <span>{m.label}</span>
                                        <strong>{m.val}</strong>
                                    </div>
                                    <div className="metric-bar">
                                        <motion.div
                                            className="bar-fill"
                                            style={{ backgroundColor: m.col }}
                                            initial={{ width: 0 }}
                                            animate={{ width: m.val }}
                                            transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isEditing && (
                        <motion.div
                            className="edit-modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="edit-modal-content"
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                            >
                                <h2>Edit Profile</h2>
                                <form onSubmit={handleSaveProfile}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            value={editData.phone}
                                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                    <div className="modal-actions">
                                        <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-primary" disabled={saving}>
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default UserProfile;
