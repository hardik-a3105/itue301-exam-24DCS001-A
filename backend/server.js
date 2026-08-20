const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const requestLogger = require('./middleware/logger');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Apply custom request logger globally

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// In-Memory Data Storage (Task 3)
let doctors = [
  { id: '1', name: 'Dr. Sarah Smith', email: 'sarah.smith@medcareplus.com', specialisation: 'Cardiology', available: true },
  { id: '2', name: 'Dr. Michael Jones', email: 'michael.jones@medcareplus.com', specialisation: 'Neurology', available: true },
  { id: '3', name: 'Dr. Emily White', email: 'emily.white@medcareplus.com', specialisation: 'Pediatrics', available: false },
  { id: '4', name: 'Dr. Alex Vance', email: 'alex.vance@medcareplus.com', specialisation: 'Orthopedics', available: true }
];

let appointments = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Smith',
    doctorId: '1',
    date: '2026-08-25',
    timeSlot: '10:00 AM - 10:30 AM',
    status: 'confirmed',
    reason: 'Routine Cardiology Consultation'
  },
  {
    id: '2',
    patientName: 'Emma Watson',
    doctorName: 'Dr. Michael Jones',
    doctorId: '2',
    date: '2026-08-26',
    timeSlot: '02:00 PM - 02:30 PM',
    status: 'pending',
    reason: 'Migraine and Headaches'
  }
];

// Base Route
app.get('/', (req, res) => {
  res.send('Hospital Appointment System API is running.');
});

// REST Endpoints (Task 3)

// 1. GET /api/v1/appointments - Return all appointments (200 OK)
app.get('/api/v1/appointments', (req, res) => {
  res.status(200).json(appointments);
});

// 2. POST /api/v1/appointments - Create a new appointment (201 Created)
app.post('/api/v1/appointments', (req, res, next) => {
  try {
    const { patientName, doctorName, doctorId, date, timeSlot, status, reason } = req.body;

    if (!patientName || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Please provide patientName, date, and timeSlot.'
      });
    }

    const newAppointment = {
      id: (appointments.length + 1).toString(),
      patientName,
      doctorName: doctorName || 'Assigned Specialist',
      doctorId: doctorId || '1',
      date,
      timeSlot,
      status: status || 'pending',
      reason: reason || 'General Consultation'
    };

    appointments.push(newAppointment);

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment: newAppointment
    });
  } catch (error) {
    next(error);
  }
});

// 3. GET /api/v1/doctors - Return all doctors (200 OK)
app.get('/api/v1/doctors', (req, res) => {
  res.status(200).json(doctors);
});

// Global Error Handling Middleware (Last middleware in app)
app.use((err, req, res, next) => {
  console.error('[Error caught by global handler]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
