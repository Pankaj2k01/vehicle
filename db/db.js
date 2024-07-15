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
      policyNumber: { type: String, required: true, index: true},
      vehicleNumber: { type: String, required: true, index: true}
    });
    
    const policySchema = new mongoose.Schema({
      vehicleNumber: { type: String, required: true, index: true },
      policyStartDate: { type: Date, required: true },
      policyEndDate: { type: Date, required: true },
      policyPrice: { type: Number, required: true },
      vehicleType: { type: String, required: true },
      policyNumber: { type: String  }
    });
    
    const User = mongoose.model('User', userSchema);
    const Claim = mongoose.model('Claim', claimSchema);
    const Policy = mongoose.model('Policy', policySchema);

module.exports = { User, Claim ,Policy};