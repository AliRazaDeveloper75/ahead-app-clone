import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import TryNow from './components/TryNow';
import PlanSelection from './components/PlanSelection';
import Payment from './components/Payment';
import FindProfile from './components/FindProfile';
import UserProfile from './components/UserProfile';
import ImprovementPlan from './components/ImprovementPlan';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MobileBottomNav from './components/MobileBottomNav';
import Emotions from './pages/Emotions';
import ManifestoPage from './pages/ManifestoPage';
import SelfAwarenessPage from './pages/SelfAwarenessPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import './App.css';
import FAQ from './pages/FAQ';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdmin && <Navbar />}
      <main>
        {children}
      </main>
      {!isAdmin && <MobileBottomNav />}
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/try-now" element={<TryNow />} />
          <Route path="/plan" element={<PlanSelection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/find-profile" element={<FindProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<ImprovementPlan />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/emotions" element={<Emotions />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="/self-awareness" element={<SelfAwarenessPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/terms-of-use" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
