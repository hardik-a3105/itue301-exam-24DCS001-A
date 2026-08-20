import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Activity, 
  FileText, 
  CheckCircle, 
  Clock, 
  Stethoscope, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';

const availableDoctors = [
  { id: '1', name: 'Dr. Sarah Smith', specialisation: 'Cardiology' },
  { id: '2', name: 'Dr. Michael Jones', specialisation: 'Neurology' },
  { id: '3', name: 'Dr. Emily White', specialisation: 'Pediatrics' },
  { id: '4', name: 'Dr. Alex Vance', specialisation: 'Orthopedics' },
  { id: '5', name: 'Dr. Lisa Ray', specialisation: 'Dermatology' },
  { id: '6', name: 'Dr. James Anderson', specialisation: 'General Medicine' },
];

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:30 AM - 12:00 PM',
  '02:00 PM - 02:30 PM',
  '03:30 PM - 04:00 PM',
  '04:30 PM - 05:00 PM'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BookingPage = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    age: '',
    bloodGroup: 'O+',
    doctorId: '1',
    doctorName: 'Dr. Sarah Smith',
    date: new Date().toISOString().split('T')[0],
    timeSlot: timeSlots[0],
    reason: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doctorId') {
      const selectedDoc = availableDoctors.find(d => d.id === value);
      setFormData(prev => ({
        ...prev,
        doctorId: value,
        doctorName: selectedDoc ? selectedDoc.name : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title" style={{ fontSize: '2rem' }}>Book a Medical Appointment</h1>
          <p className="section-subtitle">
            Schedule a consultation with our certified doctors in just a few clicks.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Booking Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#ecfdf5',
                color: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>Appointment Booked!</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Your appointment for <strong>{formData.patientName || 'Patient'}</strong> with <strong>{formData.doctorName}</strong> has been registered with <strong>pending</strong> status.
              </p>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(prev => ({ ...prev, patientName: '', email: '', phone: '', age: '', reason: '' }));
                }}
                className="btn btn-primary"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                1. Patient Information
              </h3>

              {/* Patient Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                  Full Name *
                </label>
                <div className="search-box" style={{ width: '100%' }}>
                  <User size={18} color="#94a3b8" />
                  <input
                    type="text"
                    name="patientName"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <div className="search-box" style={{ width: '100%' }}>
                    <Mail size={18} color="#94a3b8" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                    Phone Number *
                  </label>
                  <div className="search-box" style={{ width: '100%' }}>
                    <Phone size={18} color="#94a3b8" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Age & Blood Group */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="1"
                    max="120"
                    placeholder="e.g. 32"
                    value={formData.age}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  >
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem', marginTop: '0.5rem' }}>
                2. Appointment Details
              </h3>

              {/* Select Doctor */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                  Select Specialist Doctor *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  >
                    {availableDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.specialisation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                    Available Time Slot *
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                  Reason for Visit / Symptoms *
                </label>
                <textarea
                  name="reason"
                  required
                  rows="3"
                  placeholder="Describe your health concern or symptoms..."
                  value={formData.reason}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
              >
                <span>Confirm & Submit Appointment</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Live Preview Column */}
        <div>
          <div style={{
            background: '#f8fafc',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1',
            padding: '1.5rem',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0369a1' }}>
              <Sparkles size={18} />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Live Appointment Card Preview</h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
              This is how the <code>AppointmentCard</code> component renders your appointment data in real-time.
            </p>

            <AppointmentCard
              patientName={formData.patientName || 'Jane Patient'}
              doctorName={formData.doctorName}
              date={formData.date || 'YYYY-MM-DD'}
              timeSlot={formData.timeSlot}
              status="pending"
            />

            <div style={{
              marginTop: '1.25rem',
              padding: '1rem',
              background: '#f0fdf4',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
              fontSize: '0.825rem',
              color: '#166534'
            }}>
              💡 <strong>Instant Confirmation:</strong> New appointments automatically initialize in <strong>pending</strong> state and will be verified by clinical staff.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
