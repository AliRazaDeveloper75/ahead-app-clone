import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './FindProfile.css';

const FindProfile = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/user/${email}/status`);
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('mind-thinker-user', email);
                navigate('/profile');
            } else {
                setError(data.error || 'User not found. Have you taken the assessment?');
            }
        } catch (err) {
            setError('Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="find-profile-page">
            <div className="container">
                <motion.div
                    className="find-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2>Access Your Profile</h2>
                    <p>Enter your registration email to view your data and improvement plan.</p>

                    <form onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-text">{error}</p>}
                        <button className="btn btn-primary" disabled={loading}>
                            {loading ? 'Searching...' : 'Find My Profile'}
                        </button>
                    </form>

                    <div className="find-footer">
                        <p>New here? <span onClick={() => navigate('/try-now')}>Take the Assessment</span></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FindProfile;
