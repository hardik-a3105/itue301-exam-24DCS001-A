const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  age: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
