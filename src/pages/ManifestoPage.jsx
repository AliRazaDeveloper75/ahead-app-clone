import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const ManifestoPage = () => {
    return (
        <div className="content-page manifesto-page">
            <div className="container">
                <motion.header
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="page-header"
                >
                    <h1>The Mind-Thinker Manifesto</h1>
                    <p>A new philosophy for the digital mind.</p>
                </motion.header>

                <div className="manifesto-content">
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2>01. Radical Self-Honesty</h2>
                        <p>We believe growth begins where comfort ends. Looking at our shadows is as important as celebrating our light.</p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2>02. Action Over Theory</h2>
                        <p>Understanding EQ is useless without practicing it. We build tools that live in the real world, not just in textbooks.</p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2>03. Connection is Human</h2>
                        <p>In an age of algorithms, we champion the messy, beautiful art of human connection and empathy.</p>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default ManifestoPage;
