import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    HiOutlineHome,
    HiOutlineLightBulb,
    HiOutlineChartBar,
    HiOutlineUser
} from 'react-icons/hi';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
    return (
        <nav className="mobile-bottom-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <HiOutlineHome className="nav-icon" />
                <span className="nav-label">Home</span>
            </NavLink>
            <NavLink to="/try-now" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <HiOutlineLightBulb className="nav-icon" />
                <span className="nav-label">Try Now</span>
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <HiOutlineChartBar className="nav-icon" />
                <span className="nav-label">Plan</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <HiOutlineUser className="nav-icon" />
                <span className="nav-label">Profile</span>
            </NavLink>
        </nav>
    );
};

export default MobileBottomNav;
