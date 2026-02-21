import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            const response = await fetch(`http://localhost:5000/api/user/${email}/status`);
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
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
        <div className="user-dashboard">
            <div className="container">
                <motion.div
                    className="dashboard-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="user-meta">
                        <div className="avatar">👤</div>
                        <div>
                            <h1>Hello, {user.email.split('@')[0]}!</h1>
                            <p>Your mental growth journey started on {user.signupDate ? new Date(user.signupDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="dashboard-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Emotional Profile Card */}
                    <motion.div className="dashboard-card profile-summary" variants={itemVariants}>
                        <div className="card-header">
                            <h3>Emotional Profile</h3>
                            <span className="badge">Complete</span>
                        </div>
                        <div className="radar-placeholder">
                            <div className="radar-circle circle-1"></div>
                            <div className="radar-circle circle-2"></div>
                            <div className="radar-circle circle-3"></div>
                            <div className="radar-icon">📈</div>
                        </div>
                        <div className="stats-list">
                            <div className="stat-item">
                                <span>Self Awareness</span>
                                <div className="progress-bar"><div className="fill" style={{ width: '85%' }}></div></div>
                            </div>
                            <div className="stat-item">
                                <span>Empathy</span>
                                <div className="progress-bar"><div className="fill" style={{ width: '70%' }}></div></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Plan Status Card */}
                    <motion.div className="dashboard-card plan-status" variants={itemVariants}>
                        <div className="card-header">
                            <h3>My Active Plan</h3>
                        </div>
                        <div className={`plan-banner ${user.status}`}>
                            <span className="icon">{user.status === 'active' ? '✅' : '⏳'}</span>
                            <div>
                                <h4>{user.plan ? user.plan.replace('-', ' ') : 'No plan selected'}</h4>
                                <p>{user.status === 'active' ? 'All tasks unlocked' : 'Awaiting admin approval'}</p>
                            </div>
                        </div>
                        <div className="plan-perks">
                            <ul>
                                <li>✨ Daily EQ Exercises</li>
                                <li>📊 Progress Tracking</li>
                                <li>🧠 Expert Insights</li>
                            </ul>
                        </div>
                        <button
                            className={`btn ${user.status === 'active' ? 'btn-primary' : 'btn-disabled'}`}
                            disabled={user.status !== 'active'}
                            onClick={() => navigate('/dashboard')}
                        >
                            {user.status === 'active' ? 'Resume Growth Plan' : 'Unlocking Soon...'}
                        </button>
                    </motion.div>

                    {/* Progress Card */}
                    <motion.div className="dashboard-card quick-stats" variants={itemVariants}>
                        <div className="card-header">
                            <h3>Growth Progress</h3>
                        </div>
                        <div className="big-stat">
                            <span className="value">{user.completedTasks?.length || 0}</span>
                            <span className="label">Days Completed</span>
                        </div>
                        <div className="mini-grid">
                            <div className="mini-card">
                                <span>28</span>
                                <p>Goal Days</p>
                            </div>
                            <div className="mini-card">
                                <span>{Math.round(((user.completedTasks?.length || 0) / 28) * 100)}%</span>
                                <p>Finished</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="dashboard-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <button className="btn btn-outline" onClick={() => navigate('/')}>Explore More Exercises</button>
                </motion.div>
            </div>
        </div>
    );
};

export default UserProfile;
