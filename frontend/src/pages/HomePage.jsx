import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Search, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
  Stethoscope,
  Activity
} from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';

const defaultAppointments = [
  {
    id: '1',
    patientName: 'Aarav Patel',
    doctorName: 'Dr. Hardik Agrawal (Cardiology)',
    date: '2026-08-25',
    timeSlot: '10:00 AM - 10:30 AM',
    status: 'confirmed'
  },
  {
    id: '2',
    patientName: 'Ananya Shah',
    doctorName: 'Dr. Rahul Patel (Neurology)',
    date: '2026-08-26',
    timeSlot: '02:00 PM - 02:30 PM',
    status: 'pending'
  },
  {
    id: '3',
    patientName: 'Rohan Sharma',
    doctorName: 'Dr. Priya Shah (Pediatrics)',
    date: '2026-08-28',
    timeSlot: '11:00 AM - 11:30 AM',
    status: 'cancelled'
  }
];

const HomePage = () => {
  const [appointments, setAppointments] = useState(defaultAppointments);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live appointments from Express REST API
  const fetchAppointments = () => {
    setIsLoading(true);
    fetch('http://localhost:5000/api/v1/appointments')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAppointments(data);
        }
      })
      .catch(err => {
        console.log('Using default appointments');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(app => {
    const status = app.status || 'pending';
    const matchesFilter = filter === 'all' || status.toLowerCase() === filter.toLowerCase();
    const patient = app.patientName || '';
    const doctor = app.doctorName || '';
    const matchesSearch = 
      patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCount = appointments.length;
  const confirmedCount = appointments.filter(a => (a.status || '').toLowerCase() === 'confirmed').length;
  const pendingCount = appointments.filter(a => (a.status || '').toLowerCase() === 'pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Banner Section */}
      <section className="hero-card" style={{ margin: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>MedCare Plus Healthcare System</span>
          </div>
          
          <h1 className="hero-title" style={{ fontSize: '2.6rem', lineHeight: '1.2', marginBottom: '1rem', fontWeight: 800 }}>
            Compassionate Care, <br />
            <span style={{ color: 'var(--primary)' }}>Seamless Scheduling</span>
          </h1>
          
          <p className="hero-desc" style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '640px', marginBottom: '2rem', lineHeight: '1.65' }}>
            Easily manage and schedule appointments with top board-certified doctors. Experience instant confirmations, real-time status tracking, and simplified medical records.
          </p>

          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/booking" className="btn btn-primary" style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}>
              <span>Book Appointment</span>
              <ArrowRight size={18} />
            </Link>
            
            <Link to="/doctors" className="btn btn-secondary" style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}>
              <Stethoscope size={18} color="var(--primary)" />
              <span>Browse Doctors</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Summary Grid */}
      <section className="stats-grid" style={{ margin: 0, gap: '1.25rem' }}>
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
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h4>100%</h4>
            <p>Certified Specialists</p>
          </div>
        </div>
      </section>

      {/* Appointments Management Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '0.5rem'
        }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.65rem', marginBottom: '0.25rem' }}>
              Hospital Appointments Schedule
            </h2>
            <p className="section-subtitle" style={{ color: '#64748b', fontSize: '0.925rem' }}>
              Real-time schedule of patient appointments and clinical statuses.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button 
              onClick={fetchAppointments} 
              className="btn btn-secondary" 
              title="Refresh live data"
              style={{ padding: '0.6rem 1rem', fontSize: '0.875rem' }}
            >
              <RefreshCw size={15} className={isLoading ? 'lucide-spin' : ''} />
              <span>Sync Live</span>
            </button>
            <Link to="/booking" className="btn btn-primary" style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem' }}>
              <PlusCircle size={16} />
              <span>New Booking</span>
            </Link>
          </div>
        </div>

        {/* Filter Controls & Search Box Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          background: 'white',
          padding: '1rem 1.25rem',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div className="pill-group" style={{ margin: 0 }}>
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

          <div className="search-box" style={{ flex: '1', maxWidth: '360px', minWidth: '240px' }}>
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search by patient or doctor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {filteredAppointments.length > 0 ? (
          <div className="cards-grid" style={{ gap: '1.5rem' }}>
            {filteredAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id || appointment._id}
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
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: '20px',
            border: '1px dashed #cbd5e1',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Calendar size={42} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '0.5rem' }}>No Appointments Found</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              There are no appointments matching your selected filter or search keyword.
            </p>
            <Link to="/booking" className="btn btn-primary">
              <PlusCircle size={18} />
              <span>Book an Appointment</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
