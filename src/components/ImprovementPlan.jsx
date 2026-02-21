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

                <div className="weeks-container">
                    {WEEKS.map(week => (
                        <div key={week.id} className="week-section">
                            <h3>{week.title}</h3>
                            <div className="days-grid">
                                {Array.from({ length: week.days }).map((_, i) => {
                                    const dayNum = (week.id - 1) * 7 + (i + 1);
                                    const taskId = `day-${dayNum}`;
                                    const isUnlocked = isDayUnlocked(dayNum);
                                    const isCompleted = user.completedTasks.includes(taskId);
                                    const isCurrent = dayNum === currentActiveDay;

                                    return (
                                        <motion.div
                                            key={taskId}
                                            className={`day-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                                            whileHover={isUnlocked && !isCompleted ? { scale: 1.05 } : {}}
                                            onClick={() => isUnlocked && !isCompleted && setActiveTask(dayNum)}
                                        >
                                            <div className="day-number">Day {dayNum}</div>
                                            <div className="day-status">
                                                {isCompleted ? '✅' : isCurrent ? '📖' : isUnlocked ? '🔓' : '🔒'}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
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
