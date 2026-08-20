import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Search, 
  Star, 
  Calendar,
  Award,
  AlertTriangle,
  Loader,
  HeartPulse
} from 'lucide-react';

const DoctorsPage = () => {
  // Task 4: Three states - data, loading, and error
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        // Using fetch to get doctor data from the Express REST API (Task 3 & 4)
        const response = await fetch('http://localhost:5000/api/v1/doctors');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch doctors: ${response.statusText}`);
        }
        
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialisation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialisation === selectedSpecialty;
    const matchesAvailability = onlyAvailable ? doc.available : true;

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="section-header">
        <div>
          <h1 className="section-title" style={{ fontSize: '2rem' }}>Our Medical Specialists</h1>
          <p className="section-subtitle">
            Consult with top board-certified doctors across specialized departments.
          </p>
        </div>
        <Link to="/booking" className="btn btn-primary">
          <Calendar size={18} />
          <span>Book Appointment</span>
        </Link>
      </div>

      {/* Loading State (Task 4) */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#0284c7' }}>
          <Loader size={48} className="lucide-spin" style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto' }} />
          <h3 style={{ marginTop: '1.25rem', color: '#0f172a', fontSize: '1.25rem' }}>Loading Doctors Directory...</h3>
          <p style={{ color: '#64748b' }}>Connecting to MedCare Plus server...</p>
        </div>
      )}

      {/* Error State (Task 4) */}
      {error && !loading && (
        <div style={{ 
          background: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '20px', 
          padding: '2.5rem', 
          textAlign: 'center',
          color: '#dc2626',
          maxWidth: '550px',
          margin: '2rem auto'
        }}>
          <AlertTriangle size={48} style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Unable to load doctors</h3>
          <p style={{ color: '#991b1b', marginBottom: '1.25rem' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-secondary"
            style={{ margin: '0 auto' }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Main Content (Only rendered when not loading and no error) */}
      {!loading && !error && (
        <>
          {/* Filter and Search Bar */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="search-box" style={{ flex: '1', minWidth: '280px' }}>
                <Search size={18} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search doctor by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
                <input 
                  type="checkbox" 
                  checked={onlyAvailable} 
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                Show Available Only
              </label>
            </div>

            {/* Specialty Filter Pills */}
            <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {specialties.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  style={{
                    border: 'none',
                    padding: '0.45rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: selectedSpecialty === spec ? '#0284c7' : '#f1f5f9',
                    color: selectedSpecialty === spec ? 'white' : '#64748b'
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Cards Grid */}
          {filteredDoctors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem', background: 'white', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No doctors match your current search or filter criteria.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredDoctors.map(doctor => (
                <div 
                  key={doctor.id || doctor._id}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '1.75rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div>
                    {/* Top Row: Doctor Info & Availability Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                        <div style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '14px',
                          background: '#f0f9ff',
                          color: '#0284c7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #bae6fd'
                        }}>
                          <Stethoscope size={26} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '4px', fontWeight: 700 }}>
                            {doctor.name}
                          </h3>
                          <span style={{ 
                            display: 'inline-block',
                            fontSize: '0.8rem', 
                            fontWeight: 700, 
                            color: '#0284c7', 
                            background: '#e0f2fe',
                            padding: '3px 10px',
                            borderRadius: '8px'
                          }}>
                            {doctor.specialisation}
                          </span>
                        </div>
                      </div>

                      {/* Availability status badge */}
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: doctor.available ? '#ecfdf5' : '#fef2f2',
                        color: doctor.available ? '#059669' : '#dc2626',
                        border: `1px solid ${doctor.available ? '#a7f3d0' : '#fecaca'}`
                      }}>
                        {doctor.available ? <CheckCircle size={13} /> : <XCircle size={13} />}
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    {/* Doctor Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.875rem' }}>
                        <Mail size={16} color="#64748b" />
                        <span>{doctor.email || `${doctor.name.toLowerCase().replace(/[^a-z]/g, '')}@medcareplus.com`}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.875rem' }}>
                        <Award size={16} color="#64748b" />
                        <span>10+ Years Clinical Experience</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600 }}>
                        <Star size={16} fill="#f59e0b" />
                        <span>4.9</span>
                        <span style={{ color: '#94a3b8', fontWeight: 400 }}>(120+ verified reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Link to Pre-fill Booking Page */}
                  <Link 
                    to={`/booking?doctor=${encodeURIComponent(doctor.name)}`}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.925rem',
                      opacity: doctor.available ? 1 : 0.85
                    }}
                  >
                    <Calendar size={16} />
                    <span>Book with {doctor.name.split(' ')[1] || doctor.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorsPage;
