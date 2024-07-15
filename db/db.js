const mongoose = require('mongoose');
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI;

mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connected"))
    .catch(() => console.log("Error"))

    const userSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
      name: { type: String, required: true }
    });
    
    const claimSchema = new mongoose.Schema({
      claimType: { type: String, required: true },
      claimDescription: { type: String, required: true },
      dateOfIncident: { type: Date, required: true },
      locationOfIncident: { type: String, required: true },
      policyNumber: { type: String, required: true },
      vehicleNumber: { type: String, required: true }
    });
    
    const User = mongoose.model('User', userSchema);
    const Claim = mongoose.model('Claim', claimSchema);


module.exports = { User, Claim };