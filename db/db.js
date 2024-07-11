const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://yadavpankaj092785:Pankaj@cluster0.dp7un9n.mongodb.net/authtest')
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