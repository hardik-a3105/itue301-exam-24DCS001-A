import React, { useState } from 'react';
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
  Filter
} from 'lucide-react';

const mockDoctors = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@medcareplus.com',
    specialisation: 'Cardiology',
    available: true,
    experience: '12 Years',
    rating: 4.9,
    reviews: 128
  },
  {
    id: 'd2',
    name: 'Dr. Michael Jones',
    email: 'michael.jones@medcareplus.com',
    specialisation: 'Neurology',
    available: true,
    experience: '15 Years',
    rating: 4.8,
    reviews: 95
  },
  {
    id: 'd3',
    name: 'Dr. Emily White',
    email: 'emily.white@medcareplus.com',
    specialisation: 'Pediatrics',
    available: false,
    experience: '9 Years',
    rating: 4.9,
    reviews: 140
  },
  {
    id: 'd4',
    name: 'Dr. Alex Vance',
    email: 'alex.vance@medcareplus.com',
    specialisation: 'Orthopedics',
    available: true,
    experience: '11 Years',
    rating: 4.7,
    reviews: 82
  },
  {
    id: 'd5',
    name: 'Dr. Lisa Ray',
    email: 'lisa.ray@medcareplus.com',
    specialisation: 'Dermatology',
    available: true,
    experience: '8 Years',
    rating: 4.9,
    reviews: 110
  },
  {
    id: 'd6',
    name: 'Dr. James Anderson',
    email: 'james.anderson@medcareplus.com',
    specialisation: 'General Medicine',
    available: false,
    experience: '14 Years',
    rating: 4.6,
    reviews: 76
  }
];

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine'];

  const filteredDoctors = mockDoctors.filter(doc => {
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
      <div className="cards-grid">
        {filteredDoctors.map(doctor => (
          <div 
            key={doctor.id}
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
                  <span>{doctor.experience} Clinical Experience</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Star size={15} fill="#f59e0b" />
                  <span>{doctor.rating}</span>
                  <span style={{ color: '#94a3b8', fontWeight: 400 }}>({doctor.reviews} patient reviews)</span>
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
    </div>
  );
};

export default DoctorsPage;
