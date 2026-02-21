import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './PlanSelection.css';

const plans = [
    {
        id: '1-month',
        name: '1 Month',
        price: '$39.00',
        discountPrice: '$19.60',
        savings: 'Save 50%',
        daily: '$0.65',
        color: '#F3E8FF',
        badge: 'Starter'
    },
    {
        id: '3-month',
        name: '3 Month',
        price: '$79.99',
        discountPrice: '$31.99',
        savings: 'Save 60%',
        daily: '$0.36',
        color: '#EDE9FE',
        badge: 'Most Popular',
        recommended: true
    },
    {
        id: '12-month',
        name: '12 Month',
        price: '$119.99',
        discountPrice: '$58.80',
        savings: 'Save 51%',
        daily: '$0.16',
        color: '#DDD6FE',
        badge: 'Best Value'
    }
];

const PlanSelection = () => {
    const navigate = useNavigate();

    const handleSelectPlan = (planId) => {
        localStorage.setItem('mind-thinker-plan', planId);
        navigate('/payment');
    };

    return (
        <div className="plan-selection-page">
            <div className="container">
                <motion.div
                    className="plan-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span>51% discount reserved for:</span>
                    <h2>Choose your plan</h2>
                </motion.div>

                <div className="plans-grid">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            className={`plan-card ${plan.recommended ? 'recommended' : ''}`}
                            style={{ backgroundColor: plan.color }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ translateY: -10 }}
                        >
                            {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                            <h3>{plan.name}</h3>
                            <div className="price-display">
                                <span className="old-price">{plan.price}</span>
                                <span className="new-price">{plan.discountPrice}</span>
                            </div>
                            <div className="daily-price">
                                <strong>{plan.daily}</strong> per day
                            </div>
                            <p className="savings-label">{plan.savings}</p>

                            <button
                                className={`btn ${plan.recommended ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => handleSelectPlan(plan.id)}
                            >
                                Continue with Plan
                            </button>
                        </motion.div>
                    ))}
                </div>

                <p className="guarantee-text">No worries, you'll get to learn about everything before you pay.</p>
            </div>
        </div>
    );
};

export default PlanSelection;
