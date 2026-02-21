import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const [method, setMethod] = useState('online'); // 'online' or 'manual'
    const [transactionId, setTransactionId] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [loading, setLoading] = useState(false);

    const userEmail = localStorage.getItem('mind-thinker-user');
    const selectedPlan = localStorage.getItem('mind-thinker-plan');

    const handleManualPayment = async (e) => {
        e.preventDefault();
        if (!screenshot || !transactionId) {
            alert('Please provide transaction ID and upload a screenshot.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('plan', selectedPlan);
        formData.append('transactionId', transactionId);
        formData.append('screenshot', screenshot);

        try {
            const response = await fetch('/api/payment/manual', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                alert('Payment proof submitted! Please wait for admin approval.');
                navigate('/profile');
            }
        } catch (error) {
            console.error('Manual payment error:', error);
            alert('Failed to submit payment proof.');
        } finally {
            setLoading(false);
        }
    };

    const handleOnlinePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/payment/online', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, plan: selectedPlan })
            });
            const data = await response.json();
            if (data.success) {
                alert('Payment successful! Your plan is now active.');
                navigate('/profile');
            }
        } catch (error) {
            console.error('Online payment error:', error);
            alert('Payment processing failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-page">
            <div className="container">
                <motion.div
                    className="payment-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h2>Finish Your Payment</h2>
                    <p className="plan-summary">You selected the <strong>{selectedPlan?.replace('-', ' ')}</strong> plan.</p>

                    <div className="method-toggle">
                        <button
                            className={method === 'online' ? 'active' : ''}
                            onClick={() => setMethod('online')}
                        >
                            Online Pay (Card)
                        </button>
                        <button
                            className={method === 'manual' ? 'active' : ''}
                            onClick={() => setMethod('manual')}
                        >
                            Manual Transfer
                        </button>
                    </div>

                    <div className="payment-form-wrapper">
                        {method === 'online' ? (
                            <motion.form
                                key="online"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleOnlinePayment}
                            >
                                <div className="input-group">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" required />
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Expiry</label>
                                        <input type="text" placeholder="MM/YY" required />
                                    </div>
                                    <div className="input-group">
                                        <label>CVC</label>
                                        <input type="text" placeholder="123" required />
                                    </div>
                                </div>
                                <button className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Processing...' : 'Pay Now'}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="manual"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleManualPayment}
                            >
                                <div className="payment-instructions">
                                    <p>Please transfer the amount to:</p>
                                    <strong>IBAN: AE23 0000 0000 1234 5678 910</strong>
                                    <p>Bank: MindThinker Digital Bank</p>
                                </div>
                                <div className="input-group">
                                    <label>Transaction ID</label>
                                    <input
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter the reference ID"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Upload Screenshot (SS)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setScreenshot(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <button className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit Proof'}
                                </button>
                            </motion.form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Payment;
