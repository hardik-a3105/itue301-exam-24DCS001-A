const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient',
    required: [true, 'Patient reference is required']
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor',
    required: [true, 'Doctor reference is required']
  },
  date: { 
    type: String, 
    required: [true, 'Appointment date is required'] 
  },
  timeSlot: { 
    type: String, 
    required: [true, 'Time slot is required'] 
  },
  status: { 
    type: String, 
    enum: {
      values: ['pending', 'confirmed', 'cancelled'],
      message: '{VALUE} is not a valid appointment status'
    },
    default: 'pending' 
  },
  reason: { 
    type: String,
    maxLength: [300, 'Reason cannot exceed 300 characters']
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
