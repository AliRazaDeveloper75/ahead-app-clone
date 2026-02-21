import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const WorkWithUs = () => {
    return (
        <div className="content-page work-page">
            <div className="container">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="page-header"
                >
                    <h1>Build the Future of EQ</h1>
                    <p>Join our mission to make the world more emotionally intelligent, one mind at a time.</p>
                </motion.header>

                <div className="roles-section">
                    <h2>Open Roles</h2>
                    <div className="roles-list">
                        <div className="role-item">
                            <h3>EQ Psychologist</h3>
                            <span>Remote / Full-time</span>
                        </div>
                        <div className="role-item">
                            <h3>Full-stack Developer</h3>
                            <span>Remote / Full-time</span>
                        </div>
                        <div className="role-item">
                            <h3>UX Designer</h3>
                            <span>Remote / Part-time</span>
                        </div>
                    </div>
                </div>

                <div className="contact-cta">
                    <h3>Don't see a role?</h3>
                    <p>Send your vision and CV to <strong>careers@mind-thinker.com</strong></p>
                </div>
            </div>
        </div>
    );
};

export default WorkWithUs;
