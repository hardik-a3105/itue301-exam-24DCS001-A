import React from 'react';
import './AppointmentCard.css'; // Optional: for basic styling

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  // Determine CSS class based on status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className={`appointment-card ${getStatusClass(status)}`}>
      <h3>Appointment Details</h3>
      <p><strong>Patient:</strong> {patientName}</p>
      <p><strong>Doctor:</strong> {doctorName}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time Slot:</strong> {timeSlot}</p>
      <p><strong>Status:</strong> <span className={`status-badge ${getStatusClass(status)}`}>{status}</span></p>
    </div>
  );
};

export default AppointmentCard;
