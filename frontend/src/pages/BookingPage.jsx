import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';

const doctorsList = [
  'Dr. Sarah Smith (Cardiology)',
  'Dr. Michael Jones (Neurology)',
  'Dr. Emily White (Pediatrics)',
  'Dr. Alex Vance (Orthopedics)'
];

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:30 AM - 12:00 PM',
  '02:00 PM - 02:30 PM',
  '04:00 PM - 04:30 PM'
];

const BookingPage = () => {
  // State 1: Form Data (patientName, date, timeSlot)
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    timeSlot: timeSlots[0]
  });

  // State 2: Selected Doctor
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsList[0]);

  // Handle text and date input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle doctor selection change
  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment Booked for ${formData.patientName} with ${selectedDoctor}!`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="section-header">
        <div>
          <h1 className="section-title">Book an Appointment</h1>
          <p className="section-subtitle">Fill in the details below to schedule your hospital appointment.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Appointment Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          padding: '1.75rem',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Patient Name */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: '#334155' }}>
              Patient Name:
            </label>
            <input
              type="text"
              name="patientName"
              placeholder="Enter patient full name"
              value={formData.patientName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Doctor Selection */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: '#334155' }}>
              Doctor Name:
            </label>
            <select
              value={selectedDoctor}
              onChange={handleDoctorChange}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                background: 'white'
              }}
            >
              {doctorsList.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: '#334155' }}>
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Time Slot */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: '#334155' }}>
              Time Slot:
            </label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                background: 'white'
              }}
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
            Confirm Appointment
          </button>
        </form>

        {/* Real-time State Display */}
        <div style={{
          background: '#f8fafc',
          padding: '1.75rem',
          borderRadius: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#0f172a' }}>
            Live Form State
          </h3>

          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            marginBottom: '1.25rem',
            fontSize: '0.9rem',
            lineHeight: '1.8'
          }}>
            <p><strong>Entered Patient:</strong> <span style={{ color: '#0284c7' }}>{formData.patientName || '(None entered)'}</span></p>
            <p><strong>Selected Doctor:</strong> <span style={{ color: '#0284c7' }}>{selectedDoctor}</span></p>
            <p><strong>Selected Date:</strong> <span>{formData.date || '(No date chosen)'}</span></p>
            <p><strong>Selected Time:</strong> <span>{formData.timeSlot}</span></p>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#475569' }}>
            Appointment Card Preview:
          </h4>

          <AppointmentCard
            patientName={formData.patientName || 'Patient Name'}
            doctorName={selectedDoctor}
            date={formData.date || 'YYYY-MM-DD'}
            timeSlot={formData.timeSlot}
            status="pending"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
