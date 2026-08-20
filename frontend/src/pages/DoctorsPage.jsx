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
  Loader
} from 'lucide-react';

const DoctorsPage = () => {
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
        // Using fetch to get data from the Express REST API (Task 3)
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

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#0284c7' }}>
          <Loader size={48} className="lucide-spin" style={{ animation: 'spin 2s linear infinite' }} />
          <h3 style={{ marginTop: '1rem', color: '#0f172a' }}>Loading Doctors...</h3>
          <p style={{ color: '#64748b' }}>Please wait while we fetch the latest directory.</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={{ 
          background: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '16px', 
          padding: '2rem', 
          textAlign: 'center',
          color: '#dc2626'
        }}>
          <AlertTriangle size={48} style={{ margin: '0 auto 1rem' }} />
          <h3>Unable to load doctors</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Main Content (Only when not loading and no error) */}
      {!loading && !error && (
        <>
          {/* Filter and Search Bar */}
          <div style={{
            background: 'white',
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="search-box" style={{ flex: '1', minWidth: '280px' }}>
                <Search size={18} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
                <input 
                  type="checkbox" 
                  checked={onlyAvailable} 
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                Show Available Only
              </label>
            </div>

            {/* Specialty Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {specialties.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  style={{
                    border: 'none',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '9999px',
                    fontSize: '0.825rem',
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

          {/* Doctors Grid */}
          {filteredDoctors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
              <p style={{ color: '#64748b' }}>No doctors match your search or filter criteria.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredDoctors.map(doctor => (
                <div 
                  key={doctor.id || doctor._id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    {/* Top Doctor Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: '#f0f9ff',
                          color: '#0284c7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #bae6fd'
                        }}>
                          <Stethoscope size={24} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '2px' }}>{doctor.name}</h3>
                          <span style={{ 
                            display: 'inline-block',
                            fontSize: '0.8rem', 
                            fontWeight: 600, 
                            color: '#0284c7', 
                            background: '#e0f2fe',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>
                            {doctor.specialisation}
                          </span>
                        </div>
                      </div>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        backgroundColor: doctor.available ? '#ecfdf5' : '#fef2f2',
                        color: doctor.available ? '#059669' : '#dc2626',
                        border: `1px solid ${doctor.available ? '#a7f3d0' : '#fecaca'}`
                      }}>
                        {doctor.available ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {doctor.available ? 'Available' : 'Busy'}
                      </span>
                    </div>

                    {/* Doctor Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                        <Mail size={15} />
                        <span>{doctor.email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                        <Award size={15} />
                        <span>{doctor.experience || '10+ Years'} Clinical Experience</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600 }}>
                        <Star size={15} fill="#f59e0b" />
                        <span>{doctor.rating || '4.8'}</span>
                        <span style={{ color: '#94a3b8', fontWeight: 400 }}>({doctor.reviews || '100+'} patient reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  <Link 
                    to="/booking" 
                    className="btn btn-outline"
                    style={{
                      width: '100%',
                      backgroundColor: doctor.available ? '#f8fafc' : '#f8fafc',
                      color: doctor.available ? '#0284c7' : '#64748b',
                      borderColor: doctor.available ? '#bae6fd' : '#e2e8f0',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  >
                    <Calendar size={16} />
                    <span>Book Appointment</span>
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
