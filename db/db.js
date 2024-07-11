const mongoose = require('mongoose');
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI;

mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connected"))
    .catch(() => console.log("Error"))

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  policyNumber: String,
  vehicleNumber: String
});

const claimSchema = new mongoose.Schema({
  claimType: String,
  claimDescription: String,
  dateOfIncident: Date,
  locationOfIncident: String,
  policyNumber: String,
  vehicleNumber: String
});

const User = mongoose.model('User', userSchema);
const Claim = mongoose.model('Claim', claimSchema);

module.exports = { User, Claim };