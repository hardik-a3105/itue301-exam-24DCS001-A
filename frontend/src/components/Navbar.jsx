import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HeartPulse, Home, Users, CalendarPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <HeartPulse size={24} />
          </div>
          <div className="brand-text">
            MedCare<span>Plus</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/doctors" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Doctors</span>
          </NavLink>

          <NavLink 
            to="/booking" 
            className={({ isActive }) => `nav-link nav-btn ${isActive ? 'active' : ''}`}
          >
            <CalendarPlus size={18} />
            <span>Booking</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
