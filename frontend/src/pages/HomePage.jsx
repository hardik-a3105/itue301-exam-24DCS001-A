import React from 'react';
import AppointmentCard from '../components/AppointmentCard';

const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>MedCare Plus Hospital</h1>
      <p>Welcome to the Hospital Appointment System.</p>
      
      <h2>Your Upcoming Appointments</h2>
      
      <AppointmentCard 
        patientName="John Doe" 
        doctorName="Dr. Sarah Smith" 
        date="2024-05-20" 
        timeSlot="10:00 AM - 10:30 AM" 
        status="pending" 
      />
      <AppointmentCard 
        patientName="John Doe" 
        doctorName="Dr. Michael Jones" 
        date="2024-05-22" 
        timeSlot="02:00 PM - 02:30 PM" 
        status="confirmed" 
      />
      <AppointmentCard 
        patientName="John Doe" 
        doctorName="Dr. Emily White" 
        date="2024-05-25" 
        timeSlot="11:00 AM - 11:30 AM" 
        status="cancelled" 
      />
    </div>
  );
};

export default HomePage;
