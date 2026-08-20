import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Component */}
        <Navbar />

        {/* Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} MedCare Plus Hospital Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
