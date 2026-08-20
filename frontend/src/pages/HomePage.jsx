import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Search, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';

const initialAppointments = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Smith (Cardiology)',
    date: '2026-08-25',
    timeSlot: '10:00 AM - 10:30 AM',
    status: 'confirmed'
  },
  {
    id: '2',
    patientName: 'Emma Watson',
    doctorName: 'Dr. Michael Jones (Neurology)',
    date: '2026-08-26',
    timeSlot: '02:00 PM - 02:30 PM',
    status: 'pending'
  },
  {
    id: '3',
    patientName: 'Robert Johnson',
    doctorName: 'Dr. Emily White (Pediatrics)',
    date: '2026-08-28',
    timeSlot: '11:00 AM - 11:30 AM',
    status: 'cancelled'
  },
  {
    id: '4',
    patientName: 'Sophia Miller',
    doctorName: 'Dr. Alex Vance (Orthopedics)',
    date: '2026-08-29',
    timeSlot: '04:15 PM - 04:45 PM',
    status: 'confirmed'
  },
  {
    id: '5',
    patientName: 'David Clark',
    doctorName: 'Dr. Sarah Smith (Cardiology)',
    date: '2026-08-30',
    timeSlot: '09:30 AM - 10:00 AM',
    status: 'pending'
  }
];

const HomePage = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = initialAppointments.filter(app => {
    const matchesFilter = filter === 'all' || app.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = 
      app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCount = initialAppointments.length;
  const confirmedCount = initialAppointments.filter(a => a.status === 'confirmed').length;
  const pendingCount = initialAppointments.filter(a => a.status === 'pending').length;

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-card">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Next-Gen Healthcare Management</span>
        </div>
        <h1 className="hero-title">
          Compassionate Care, <span>Seamless Scheduling</span>
        </h1>
        <p className="hero-desc">
          Welcome to MedCare Plus Hospital System. Easily manage patient appointments, track specialist doctors, and experience fast clinical workflows.
        </p>
        <div className="hero-actions">
          <Link to="/book" className="btn btn-primary">
            <span>Book New Appointment</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/doctors" className="btn btn-secondary">
            <UserCheck size={18} />
            <span>Meet Our Specialists</span>
          </Link>
        </div>
      </section>

      {/* Stats Summary Grid */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h4>{totalCount}</h4>
            <p>Total Appointments</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <h4 style={{ color: '#059669' }}>{confirmedCount}</h4>
            <p>Confirmed Bookings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fffbeb', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h4 style={{ color: '#d97706' }}>{pendingCount}</h4>
            <p>Pending Approval</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
            <ShieldCheck size={24} />
          </div>
          <div className="stat-info">
            <h4>100%</h4>
            <p>Certified Specialists</p>
          </div>
        </div>
      </section>

      {/* Appointments Management Section */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">Hospital Appointments</h2>
            <p className="section-subtitle">Real-time schedule of patient appointments and clinical statuses.</p>
          </div>
        </div>

        {/* Filter Controls & Search Box */}
        <div className="filters-container">
          <div className="pill-group">
            <button 
              className={`pill-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({totalCount})
            </button>
            <button 
              className={`pill-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({confirmedCount})
            </button>
            <button 
              className={`pill-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({pendingCount})
            </button>
            <button 
              className={`pill-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </button>
          </div>

          <div className="search-box">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search by patient or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {filteredAppointments.length > 0 ? (
          <div className="cards-grid">
            {filteredAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                patientName={appointment.patientName}
                doctorName={appointment.doctorName}
                date={appointment.date}
                timeSlot={appointment.timeSlot}
                status={appointment.status}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'white',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1'
          }}>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No appointments match your selected filter or search query.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
