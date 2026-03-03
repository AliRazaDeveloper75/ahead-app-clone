import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                setStatus('Thank you! Your message has been received.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(`Error: ${data.error || 'Failed to send message'}`);
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('Connection error. Please try again later.');
        }
    };

    return (
        <div className="content-page contact-page">
            <div className="container">
                <motion.header
                    className="page-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Get in Touch</h1>
                    <p>Have questions or feedback? Our team is orbiting 24/7 to help you.</p>
                </motion.header>

                <div className="content-grid">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="content-card">
                            <h3>Contact Details</h3>
                            <div className="contact-item">
                                <strong>📧 Email</strong>
                                <p><a href="mailto:hi@mind-orbit.com">hi@mind-orbit.com</a></p>
                            </div>
                            <div className="contact-item">
                                <strong>📍 Location</strong>
                                <p>Auguststraße 26, 10117 Berlin, Germany</p>
                            </div>
                            <div className="contact-item">
                                <strong>🌐 Social</strong>
                                <p>@mindorbitapp</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <form className="contact-form content-card" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                            {status && <p className="form-status">{status}</p>}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
