import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ImprovementPlan.css';

const WEEKS = [
    { id: 1, title: 'Week 1: Foundations', days: 7 },
    { id: 2, title: 'Week 2: Emotional Balance', days: 7 },
    { id: 3, title: 'Week 3: Social Mastery', days: 7 },
    { id: 4, title: 'Week 4: Long-term Growth', days: 7 }
];

// Custom Animated SVG Icons
const StatusIcon = ({ type }) => {
    switch (type) {
        case 'completed':
            return (
                <svg className="icon-svg completed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            );
        case 'current':
            return (
                <svg className="icon-svg current-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            );
        case 'unlocked':
            return (
                <svg className="icon-svg unlocked-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
            );
        default:
            return (
                <svg className="icon-svg locked-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            );
    }
};

const ImprovementPlan = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTask, setActiveTask] = useState(null); // The task currently being viewed

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
        } catch (error) {
            console.error('Error fetching status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteTask = async (taskId) => {
        try {
            const response = await fetch(`/api/user/${email}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskId })
            });
            const data = await response.json();
            if (data.success) {
                setUser({ ...user, completedTasks: data.completedTasks });
                setActiveTask(null);
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    if (loading) return <div className="dashboard-loading">Loading your plan...</div>;

    if (user.status !== 'active') {
        return (
            <div className="locked-dashboard">
                <div className="container">
                    <motion.div
                        className="locked-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="lock-icon">{user.status === 'awaiting_approval' ? '⏳' : '🔒'}</div>
                        <h2>{user.status === 'awaiting_approval' ? 'Awaiting Approval' : 'Plan Locked'}</h2>
                        <p>
                            {user.status === 'awaiting_approval'
                                ? 'We are verifying your payment screenshot. This usually takes 1-2 hours.'
                                : 'Please complete your payment to unlock your 4-week improvement plan.'}
                        </p>
                        {user.status === 'pending' && (
                            <button className="btn btn-primary" onClick={() => navigate('/plan')}>Go to Payment</button>
                        )}
                        <button className="btn btn-outline" onClick={() => navigate('/')}>Back Home</button>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Helper to check if a day is unlocked
    const isDayUnlocked = (dayNum) => {
        if (dayNum === 1) return true;
        // Current day is unocked if previous day is completed
        return user.completedTasks.includes(`day-${dayNum - 1}`);
    };

    // Helper to identify the CURRENT active day that needs focus
    const getCurrentDay = () => {
        for (let i = 1; i <= 28; i++) {
            if (!user.completedTasks.includes(`day-${i}`)) return i;
        }
        return 28;
    };

    const currentActiveDay = getCurrentDay();

    return (
        <div className="dashboard-page">
            <div className="container">
                <header className="dashboard-header">
                    <h1>Your 1-Month Plan</h1>
                    <p>Complete each day's task to unlock the next level. Current target: <strong>Day {currentActiveDay}</strong></p>
                </header>

                <div className="map-container snake-layout">
                    {/* Decorative Background Elements */}
                    <div className="decorations">
                        <div className="decoration cloud c1">☁️</div>
                        <div className="decoration cloud c2">☁️</div>
                        <div className="decoration island i1">🏝️</div>
                        <div className="decoration island i2">⛰️</div>
                        <div className="decoration sparkle s1">✨</div>
                        <div className="decoration sparkle s2">✨</div>
                    </div>

                    <div className="weeks-wrapper">
                        {[0, 1, 2, 3].map(weekIndex => (
                            <div key={weekIndex} className={`week-row ${weekIndex % 2 === 1 ? 'reverse' : 'normal'}`}>
                                {Array.from({ length: 7 }).map((_, dayInWeek) => {
                                    const dayNum = weekIndex * 7 + (dayInWeek + 1);
                                    const taskId = `day-${dayNum}`;
                                    const isUnlocked = isDayUnlocked(dayNum);
                                    const isCompleted = user.completedTasks.includes(taskId);
                                    const isCurrent = dayNum === currentActiveDay;
                                    const isWeekEnd = dayNum % 7 === 0;

                                    return (
                                        <motion.div
                                            key={taskId}
                                            className={`level-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isWeekEnd ? 'week-end' : ''}`}
                                            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: (dayNum % 7) * 0.05
                                            }}
                                            onClick={() => isUnlocked && !isCompleted && setActiveTask(dayNum)}
                                        >
                                            {isCurrent && (
                                                <motion.div
                                                    className="character-indicator"
                                                    animate={{
                                                        y: [0, -15, 0],
                                                        rotate: [-2, 2, -2]
                                                    }}
                                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                                >
                                                    <div className="character-bubble">Next Step!</div>
                                                    <div className="character-icon">✨</div>
                                                </motion.div>
                                            )}

                                            <div className="node-3d-wrapper">
                                                <div className="node-content">
                                                    <div className="node-inner">
                                                        <div className="node-number">{dayNum < 10 ? `0${dayNum}` : dayNum}</div>
                                                        <div className="node-status-icon">
                                                            <StatusIcon type={isCompleted ? 'completed' : isCurrent ? 'current' : isUnlocked ? 'unlocked' : 'locked'} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="node-shadow"></div>
                                                {isCurrent && <div className="node-aura"></div>}
                                            </div>
                                            <div className="node-label">Day {dayNum}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {activeTask && (
                        <motion.div
                            className="task-modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="task-content"
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                            >
                                <h2>Day {activeTask} Task</h2>
                                <div className="lesson-text">
                                    <p>Today is all about active listening. Set a goal to listen more than you speak in your next conversation.</p>
                                    <ul>
                                        <li>Breathe before responding.</li>
                                        <li>Observe the other person's body language.</li>
                                        <li>Repeat back what you heard to clarify.</li>
                                    </ul>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-outline" onClick={() => setActiveTask(null)}>Close</button>
                                    <button className="btn btn-primary" onClick={() => handleCompleteTask(`day-${activeTask}`)}>Mark as Completed</button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ImprovementPlan;
