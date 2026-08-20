const mongoose = require('mongoose');
require('dotenv').config();

const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital')
  .then(async () => {
    console.log('Connected to MongoDB. Seeding data...');

    // Clear existing data to prevent duplicates on multiple runs
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});

    // 1. Create Doctors
    const doctors = await Doctor.insertMany([
      {
        name: 'Dr. Hardik Agrawal',
        email: 'hardik.agrawal@medcareplus.com',
        specialisation: 'Cardiology',
        available: true
      },
      {
        name: 'Dr. Rahul Patel',
        email: 'rahul.patel@medcareplus.com',
        specialisation: 'Neurology',
        available: true
      },
      {
        name: 'Dr. Priya Shah',
        email: 'priya.shah@medcareplus.com',
        specialisation: 'Pediatrics',
        available: false
      },
      {
        name: 'Dr. Dev Mehta',
        email: 'dev.mehta@medcareplus.com',
        specialisation: 'Orthopedics',
        available: true
      },
      {
        name: 'Dr. Neha Joshi',
        email: 'neha.joshi@medcareplus.com',
        specialisation: 'Dermatology',
        available: true
      }
    ]);

    // 2. Create Patients
    const patient1 = await Patient.create({
      name: 'Aarav Patel',
      email: 'aarav.patel@example.com',
      phone: '9876543210',
      bloodGroup: 'O+',
      age: 35
    });

    const patient2 = await Patient.create({
      name: 'Ananya Shah',
      email: 'ananya.shah@example.com',
      phone: '9876543211',
      bloodGroup: 'A-',
      age: 28
    });

    // 3. Create Appointments
    await Appointment.create([
      {
        patientId: patient1._id,
        doctorId: doctors[0]._id,
        date: '2026-08-25',
        timeSlot: '10:00 AM - 10:30 AM',
        status: 'confirmed',
        reason: 'Routine Checkup'
      },
      {
        patientId: patient2._id,
        doctorId: doctors[1]._id,
        date: '2026-08-26',
        timeSlot: '02:00 PM - 02:30 PM',
        status: 'pending',
        reason: 'Headache Consultation'
      }
    ]);

    console.log('✅ Database seeded successfully! You can now view the data in MongoDB Compass.');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Failed to seed database:', err);
    process.exit(1);
  });
