import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Manifesto from '../components/Manifesto';
import SelfAwareness from '../components/SelfAwareness';
import Testimonials from '../components/Testimonials';

const LandingPage = () => {
    return (
        <>
            <Hero />
            <Features />
            <Manifesto />
            <SelfAwareness />
            <Testimonials />
        </>
    );
};

export default LandingPage;
