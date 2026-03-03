import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const sections = [
    {
        icon: '📜',
        title: 'Acceptance of Terms',
        content: [
            'By accessing or using the Mind Orbit platform ("Service"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our Service.',
            'These terms apply to all users of the platform including visitors, registered users, and paying subscribers.',
        ],
    },
    {
        icon: '🧠',
        title: 'Nature of the Service',
        content: [
            'Mind Orbit is an emotional intelligence coaching platform that provides educational content, self-assessment tools, and personalised 28-day improvement plans.',
            'Mind Orbit is NOT a licensed medical or mental health service. Our content is for personal development and educational purposes only. If you are experiencing a mental health crisis, please seek professional help immediately.',
            'Results from our assessments and plans are personalised but not guaranteed. Emotional growth requires sustained personal effort and commitment.',
        ],
    },
    {
        icon: '👤',
        title: 'User Accounts & Eligibility',
        content: [
            'To access the full improvement plan, you must be at least 18 years of age and provide a valid email address.',
            'You are responsible for keeping your session email confidential. You agree to notify us immediately if you suspect unauthorised access to your account.',
            'We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.',
        ],
    },
    {
        icon: '💳',
        title: 'Payments & Subscriptions',
        content: [
            'Access to the 28-day Improvement Plan requires a one-time or subscription-based payment as described on the Plan Selection page.',
            'Manual payment submissions (screenshot-based) are subject to a verification period of up to 24 hours. Plan access is granted upon successful verification.',
            'Payments are non-refundable once the plan has been activated and accessed. If you encounter technical issues preventing plan access, please contact us within 72 hours of payment.',
        ],
    },
    {
        icon: '🚫',
        title: 'Prohibited Conduct',
        content: [
            'You agree not to attempt to reverse-engineer, scrape, or exploit any part of the Mind Orbit platform.',
            'You may not share your account, plan content, or assessment data with third parties for commercial purposes.',
            'Any abusive, fraudulent, or unlawful use of the Service will result in immediate account termination without refund.',
        ],
    },
    {
        icon: '⚖️',
        title: 'Limitation of Liability',
        content: [
            'Mind Orbit and its operators shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service.',
            'Our total liability to you for any claim arising from use of Mind Orbit shall not exceed the amount paid by you in the 3 months preceding the claim.',
        ],
    },
    {
        icon: '🔄',
        title: 'Changes to Terms',
        content: [
            'We reserve the right to modify these Terms at any time. Material changes will be notified via email or a prominent in-app notice.',
            'Continued use of the Service after updates constitutes acceptance of the revised Terms.',
            'These Terms were last updated on 3 March 2026.',
        ],
    },
];

const TermsConditions = () => (
    <div className="content-page legal-page">
        <div className="container">
            <motion.header
                className="page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Terms & Conditions</h1>
                <p>Please read these terms carefully before using Mind Orbit. By using our platform, you agree to be bound by them.</p>
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
                <p>Legal queries? Contact us at <a href="mailto:hi@mind-orbit.com">hi@mind-orbit.com</a></p>
            </motion.div>
        </div>
    </div>
);

export default TermsConditions;
