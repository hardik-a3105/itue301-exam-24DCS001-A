const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const requestLogger = require('./middleware/logger');

// Import Mongoose Models (Task 5)
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Apply custom request logger globally

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// --- Task 3: In-Memory Data Storage & Endpoints ---
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
  }
];

app.get('/', (req, res) => {
  res.send('Hospital Appointment System API is running.');
});

// GET /api/v1/appointments
app.get('/api/v1/appointments', (req, res) => {
  res.status(200).json(appointments);
});

// POST /api/v1/appointments
app.post('/api/v1/appointments', (req, res, next) => {
  try {
    const { patientName, doctorName, doctorId, date, timeSlot, status, reason } = req.body;

    if (!patientName || !date || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please provide patientName, date, and timeSlot.' });
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

// GET /api/v1/doctors
app.get('/api/v1/doctors', (req, res) => {
  res.status(200).json(doctors);
});


// --- Task 5: MongoDB Mongoose Implementation Demonstrations ---

// 1. Successful MongoDB Operation (Create Patient)
app.post('/api/v1/db/patients', async (req, res, next) => {
  try {
    const newPatient = new Patient({
      name: 'Alice Johnson',
      email: `alice.${Date.now()}@example.com`,
      phone: '+1 (555) 123-4567',
      bloodGroup: 'AB+', // Valid blood group
      age: 28
    });
    
    // Save to actual MongoDB Database
    await newPatient.save();
    
    res.status(201).json({
      success: true,
      message: 'Patient created successfully in MongoDB',
      data: newPatient
    });
  } catch (error) {
    next(error);
  }
});

// 2. Validation Failure Demonstration (Invalid Blood Group & Missing Name)
app.post('/api/v1/db/patients/fail', async (req, res, next) => {
  try {
    const invalidPatient = new Patient({
      // Intentionally missing 'name' (required field)
      email: `invalid.${Date.now()}@example.com`,
      bloodGroup: 'Z-', // Invalid enum value
      age: 45
    });
    
    // This will throw a Mongoose ValidationError
    await invalidPatient.save(); 
    
    res.status(201).json({ success: true, data: invalidPatient });
  } catch (error) {
    // Return meaningful error response instead of raw mongoose error object
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Mongoose Validation Failed',
        errors: errorMessages
      });
    }
    next(error);
  }
});

// Global Error Handling Middleware (Task 3 & 5)
app.use((err, req, res, next) => {
  console.error('[Error caught by global handler]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
