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

app.get('/', (req, res) => {
  res.send('Hospital Appointment System API is running.');
});

// --- Task 3 & 5: REST Endpoints using MongoDB ---

// GET /api/v1/appointments
app.get('/api/v1/appointments', async (req, res, next) => {
  try {
    // Populate references to get full details
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('doctorId');
    
    // Map to a simpler structure for the frontend if needed, or return raw
    const formatted = appointments.map(app => ({
      id: app._id,
      patientName: app.patientId?.name || 'Unknown Patient',
      doctorName: app.doctorId?.name || 'Unknown Doctor',
      date: app.date,
      timeSlot: app.timeSlot,
      status: app.status,
      reason: app.reason
    }));

    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/appointments
app.post('/api/v1/appointments', async (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, status, reason } = req.body;

    if (!patientName || !date || !timeSlot || !doctorName) {
      return res.status(400).json({ success: false, message: 'Please provide patientName, doctorName, date, and timeSlot.' });
    }

    // 1. Find or create the patient by name (for simplicity in this flow)
    let patient = await Patient.findOne({ name: patientName });
    if (!patient) {
      patient = new Patient({
        name: patientName,
        email: `${patientName.replace(/\s+/g, '').toLowerCase()}${Date.now()}@example.com`,
        bloodGroup: 'O+', // default
        age: 30 // default
      });
      await patient.save();
    }

    // 2. Find the doctor by name
    let doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      // If doctor doesn't exist, create a generic one
      doctor = new Doctor({
        name: doctorName,
        specialisation: 'General Medicine',
        available: true
      });
      await doctor.save();
    }

    // 3. Create the appointment in MongoDB
    const newAppointment = new Appointment({
      patientId: patient._id,
      doctorId: doctor._id,
      date,
      timeSlot,
      status: status || 'pending',
      reason: reason || 'General Consultation'
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully in MongoDB',
      appointment: {
        id: newAppointment._id,
        patientName: patient.name,
        doctorName: doctor.name,
        date: newAppointment.date,
        timeSlot: newAppointment.timeSlot,
        status: newAppointment.status
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: 'Validation Failed', errors: errorMessages });
    }
    next(error);
  }
});

// GET /api/v1/doctors
app.get('/api/v1/doctors', async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    // Map to include ID string for frontend components expecting 'id'
    const formatted = doctors.map(doc => ({
      ...doc.toObject(),
      id: doc._id.toString()
    }));
    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
});


// --- Task 5: MongoDB Mongoose Implementation Demonstrations (Explicit) ---

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
      email: `invalid.${Date.now()}@example.com`,
      bloodGroup: 'Z-', // Invalid enum value
      age: 45
    });
    
    await invalidPatient.save(); 
    
    res.status(201).json({ success: true, data: invalidPatient });
  } catch (error) {
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
