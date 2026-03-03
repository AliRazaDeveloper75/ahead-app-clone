import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './SelfAwareness.css';

const SelfAwareness = () => {
    return (
        <section id="self-awareness" className="self-awareness">
            <div className="container">
                <div className="sa-card">
                    <motion.div
                        className="sa-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="section-tag">About Mind Orbit</div>
                        <h3>Deep Emotional Intelligence</h3>
                        <p>Mind Orbit is your dedicated space for emotional clarity. We go beyond surface-level mood tracking to help you understand the core of your reactions and build a resilient mind.</p>

                        <div className="sa-features">
                            <div className="sa-feature">
                                <span className="feature-emoji">🛡️</span>
                                <div>
                                    <h4>Root Cause Discovery</h4>
                                    <p>Identify the hidden triggers behind stress and anger.</p>
                                </div>
                            </div>
                            <div className="sa-feature">
                                <span className="feature-emoji">📈</span>
                                <div>
                                    <h4>Habit Transformation</h4>
                                    <p>Scientifically-proven paths to sustainable positive change.</p>
                                </div>
                            </div>
                        </div>

                        <Link to="/emotions" className="btn btn-primary">Discover Your Path</Link>
                    </motion.div>

                    <motion.div
                        className="sa-test"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="test-badge">Take the test</div>
                        <h2>How self-aware are you?</h2>
                        <p>Our science-backed test takes only 5 minutes and provides deep insights into your personality.</p>
                        <Link to="/try-now" className="btn btn-primary">Start the test</Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SelfAwareness;
