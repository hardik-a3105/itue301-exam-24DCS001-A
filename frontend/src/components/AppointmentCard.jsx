import React from 'react';
import { Calendar, Clock, User, Stethoscope, CheckCircle2, Clock3, XCircle } from 'lucide-react';
import './AppointmentCard.css';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  const normalizedStatus = (status || 'pending').toLowerCase();

  const getStatusIcon = () => {
    switch (normalizedStatus) {
      case 'confirmed':
        return <CheckCircle2 size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      case 'pending':
      default:
        return <Clock3 size={16} />;
    }
  };

  return (
    <div className={`appointment-card card-status-${normalizedStatus}`}>
      <div className="card-top">
        <div className="patient-avatar-box">
          <div className="avatar-circle">
            <User size={18} />
          </div>
          <div>
            <span className="label-caption">Patient Name</span>
            <h4 className="patient-name">{patientName}</h4>
          </div>
        </div>
        <div className={`status-badge status-${normalizedStatus}`}>
          {getStatusIcon()}
          <span>{status}</span>
        </div>
      </div>

      <div className="card-divider" />

      <div className="card-details">
        <div className="detail-item">
          <div className="icon-wrapper doctor-icon">
            <Stethoscope size={16} />
          </div>
          <div>
            <span className="label-caption">Assigned Doctor</span>
            <p className="detail-value highlight-doctor">{doctorName}</p>
          </div>
        </div>

        <div className="datetime-row">
          <div className="detail-item">
            <div className="icon-wrapper">
              <Calendar size={16} />
            </div>
            <div>
              <span className="label-caption">Appointment Date</span>
              <p className="detail-value">{date}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="icon-wrapper">
              <Clock size={16} />
            </div>
            <div>
              <span className="label-caption">Time Slot</span>
              <p className="detail-value">{timeSlot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
