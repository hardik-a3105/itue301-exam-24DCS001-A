import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { HeartPulse, Home, Users, CalendarPlus } from 'lucide-react';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
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
                <span>Dashboard</span>
              </NavLink>
              
              <NavLink 
                to="/doctors" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Users size={18} />
                <span>Doctors</span>
              </NavLink>

              <NavLink 
                to="/book" 
                className={({ isActive }) => `nav-link nav-btn ${isActive ? 'active' : ''}`}
              >
                <CalendarPlus size={18} />
                <span>Book Appointment</span>
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/book" element={<BookingPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} MedCare Plus Hospital Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
