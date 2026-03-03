import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const sections = [
    {
        icon: '📋',
        title: 'Information We Collect',
        content: [
            'When you use Mind Orbit, we collect the email address you provide during the assessment process. This is used solely to identify your account and deliver your personalised 28-day improvement plan.',
            'We also collect the answers you submit in our emotional intelligence assessment. These responses are stored securely and used only to generate your growth plan.',
            'If you submit a payment screenshot for plan activation, this image is stored temporarily for verification purposes and deleted once your plan is approved.',
        ],
    },
    {
        icon: '🔒',
        title: 'How We Use Your Information',
        content: [
            'Your email is used to retrieve your plan, send notifications about your progress, and allow you to access your profile across devices.',
            'Assessment results are used exclusively to build your personalised emotional intelligence plan. We do not sell, share, or monetise your personal data with any third party.',
            'Contact form submissions are used solely to respond to your enquiry. Messages are stored securely and not shared with any external service.',
        ],
    },
    {
        icon: '🛡️',
        title: 'Data Security',
        content: [
            'All data is stored in a secured MongoDB Atlas database with encryption at rest. We use industry-standard HTTPS to encrypt all data in transit.',
            'Access to your data is strictly limited to authorised personnel who require it to operate and improve the Mind Orbit service.',
            'We do not store passwords. Session authentication is handled via secure local storage tokens that you can clear at any time by logging out.',
        ],
    },
    {
        icon: '🍪',
        title: 'Cookies & Local Storage',
        content: [
            'Mind Orbit uses browser local storage to remember your session email so you can access your plan without re-entering it every visit.',
            'We do not use third-party tracking cookies or advertising networks. Any technical cookies used are strictly necessary for the site to function.',
        ],
    },
    {
        icon: '✏️',
        title: 'Your Rights',
        content: [
            'You have the right to request access to, correction of, or deletion of your personal data at any time by contacting us at hi@mind-orbit.com.',
            'You may withdraw consent and request full account deletion. Upon deletion, all associated data including assessment results and task progress will be permanently erased within 30 days.',
        ],
    },
    {
        icon: '📅',
        title: 'Changes to This Policy',
        content: [
            'We may update this Privacy Policy from time to time. Any material changes will be communicated via the app or to your registered email address.',
            'Continued use of Mind Orbit following a policy update constitutes your acceptance of the revised terms.',
            'This policy was last updated on 3 March 2026.',
        ],
    },
];

const PrivacyPolicy = () => (
    <div className="content-page legal-page">
        <div className="container">
            <motion.header
                className="page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Privacy Policy</h1>
                <p>Your privacy matters to us. Here is exactly how we collect, use, and protect your personal information.</p>
            </motion.header>

            <div className="legal-sections">
                {sections.map((sec, i) => (
                    <motion.div
                        key={i}
                        className="legal-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                    >
                        <div className="legal-card-title">
                            <span className="legal-icon">{sec.icon}</span>
                            <h2>{sec.title}</h2>
                        </div>
                        <div className="legal-body">
                            {sec.content.map((para, j) => <p key={j}>{para}</p>)}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="legal-contact-note"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <span>📧</span>
                <p>Questions about this policy? Email us at <a href="mailto:hi@mind-orbit.com">hi@mind-orbit.com</a> and we'll respond within 48 hours.</p>
            </motion.div>
        </div>
    </div>
);

export default PrivacyPolicy;
