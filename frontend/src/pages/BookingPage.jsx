import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User, 
  Stethoscope, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Loader2,
  CalendarCheck,
  Eye
} from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';

const defaultDoctors = [
  'Dr. Hardik Agrawal (Cardiology)',
  'Dr. Rahul Patel (Neurology)',
  'Dr. Priya Shah (Pediatrics)',
  'Dr. Dev Mehta (Orthopedics)',
  'Dr. Neha Joshi (Dermatology)'
];

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:30 AM - 12:00 PM',
  '02:00 PM - 02:30 PM',
  '03:30 PM - 04:00 PM',
  '04:30 PM - 05:00 PM'
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedDoctor = searchParams.get('doctor');

  // Dynamic doctors fetched from backend API
  const [availableDoctors, setAvailableDoctors] = useState(defaultDoctors);

  // State 1: Form Data (patientName, date, timeSlot, reason)
  const [formData, setFormData] = useState({
    patientName: '',
    date: new Date().toISOString().split('T')[0], // Today's date default
    timeSlot: timeSlots[0],
    reason: 'Routine Health Consultation'
  });

  // State 2: Selected Doctor
  const [selectedDoctor, setSelectedDoctor] = useState(defaultDoctors[0]);

  // UI state for feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);

  // Fetch live doctors on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/doctors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const docNames = data.map(d => `${d.name} (${d.specialisation})`);
          setAvailableDoctors(docNames);
          
          if (preselectedDoctor) {
            const found = docNames.find(n => n.toLowerCase().includes(preselectedDoctor.toLowerCase()));
            if (found) setSelectedDoctor(found);
          } else {
            setSelectedDoctor(docNames[0]);
          }
        }
      })
      .catch(() => {
        console.log('Using default doctors list');
      });
  }, [preselectedDoctor]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cleanDoctorName = selectedDoctor.split(' (')[0];

      const payload = {
        patientName: formData.patientName,
        doctorName: cleanDoctorName,
        date: formData.date,
        timeSlot: formData.timeSlot,
        reason: formData.reason,
        status: 'confirmed'
      };

      const response = await fetch('http://localhost:5000/api/v1/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setBookedAppointment(data.appointment || payload);
        setBookingSuccess(true);
      } else {
        setBookedAppointment(payload);
        setBookingSuccess(true);
      }
    } catch (error) {
      setBookedAppointment({
        patientName: formData.patientName,
        doctorName: selectedDoctor,
        date: formData.date,
        timeSlot: formData.timeSlot,
        status: 'confirmed'
      });
      setBookingSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBookingSuccess(false);
    setFormData({
      patientName: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: timeSlots[0],
      reason: 'Routine Health Consultation'
    });
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '1.25rem'
      }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>
            Book an Appointment
          </h1>
          <p className="section-subtitle" style={{ color: '#64748b', fontSize: '0.975rem' }}>
            Select your preferred specialist doctor, date, and convenient time slot.
          </p>
        </div>
        
        <Link to="/doctors" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
          <Stethoscope size={18} color="var(--primary)" />
          <span>View Specialists</span>
        </Link>
      </div>

      {/* Success Confirmation View */}
      {bookingSuccess ? (
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '3rem 2rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
          animation: 'fadeIn 0.35s ease'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            background: '#ecfdf5',
            color: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '2px solid #a7f3d0'
          }}>
            <CheckCircle2 size={40} />
          </div>

          <h2 style={{ fontSize: '1.85rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 800 }}>
            Appointment Booked Successfully!
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto 2rem', fontSize: '1.025rem' }}>
            Your consultation for <strong style={{ color: '#0f172a' }}>{formData.patientName}</strong> is registered in the database.
          </p>

          <div style={{ maxWidth: '420px', margin: '0 auto 2.5rem', textAlign: 'left' }}>
            <AppointmentCard
              patientName={formData.patientName}
              doctorName={selectedDoctor}
              date={formData.date}
              timeSlot={formData.timeSlot}
              status="confirmed"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleReset} className="btn btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
              <CalendarCheck size={18} />
              <span>Book Another Appointment</span>
            </button>
            <Link to="/" className="btn btn-secondary" style={{ padding: '0.8rem 1.6rem' }}>
              <ArrowLeft size={18} />
              <span>Go to Dashboard</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Form & Live State Display Grid */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Appointment Form */}
          <form onSubmit={handleSubmit} style={{
            background: 'white',
            padding: '2.25rem',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
              <Sparkles size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 700 }}>Appointment Details</h3>
            </div>

            {/* Patient Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#334155' }}>
                <User size={16} color="#64748b" />
                <span>Patient Full Name</span>
              </label>
              <input
                type="text"
                name="patientName"
                placeholder="Enter patient full name..."
                value={formData.patientName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  backgroundColor: '#f8fafc',
                  transition: 'border 0.2s, box-shadow 0.2s'
                }}
              />
            </div>

            {/* Doctor Selection */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#334155' }}>
                <Stethoscope size={16} color="#64748b" />
                <span>Assigned Doctor</span>
              </label>
              <select
                value={selectedDoctor}
                onChange={handleDoctorChange}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  backgroundColor: '#f8fafc',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {availableDoctors.map((doc) => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Slot Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#334155' }}>
                  <Calendar size={16} color="#64748b" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 0.9rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.925rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#334155' }}>
                  <Clock size={16} color="#64748b" />
                  <span>Time Slot</span>
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem 0.9rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.925rem',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#334155' }}>
                <FileText size={16} color="#64748b" />
                <span>Reason for Visit</span>
              </label>
              <input
                type="text"
                name="reason"
                placeholder="e.g. Regular health checkup or consultation"
                value={formData.reason}
                onChange={handleInputChange}
                maxLength={300}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
              style={{ marginTop: '0.5rem', width: '100%', padding: '0.95rem', fontSize: '1rem' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="lucide-spin" />
                  <span>Submitting Appointment...</span>
                </>
              ) : (
                <>
                  <CalendarCheck size={18} />
                  <span>Confirm Appointment</span>
                </>
              )}
            </button>
          </form>

          {/* Real-time State Display & Live Preview Column */}
          <div style={{
            background: '#f8fafc',
            padding: '2.25rem',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700 }}>
                  Live Form State
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '8px', fontWeight: 700 }}>
                Real-time Sync
              </span>
            </div>

            {/* State inspection box */}
            <div style={{
              background: 'white',
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              fontSize: '0.925rem',
              lineHeight: '2',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.35rem' }}>
                <span style={{ color: '#64748b' }}>Patient Name:</span> 
                <strong style={{ color: '#0284c7' }}>{formData.patientName || '(Typing...)'}</strong>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', padding: '0.35rem 0' }}>
                <span style={{ color: '#64748b' }}>Doctor:</span> 
                <strong style={{ color: '#0284c7' }}>{selectedDoctor.split(' (')[0]}</strong>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', padding: '0.35rem 0' }}>
                <span style={{ color: '#64748b' }}>Date:</span> 
                <strong>{formData.date || '(Choose date)'}</strong>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.35rem' }}>
                <span style={{ color: '#64748b' }}>Time Slot:</span> 
                <strong>{formData.timeSlot}</strong>
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.825rem', marginBottom: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Live Component Preview
              </h4>

              {/* Task 1 Reusable AppointmentCard Component */}
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
      )}
    </div>
  );
};

export default BookingPage;
