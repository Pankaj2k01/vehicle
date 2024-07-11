const express = require('express');
const app = express();
const { User, Claim } = require('./db/db');
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');
app.use(bodyparser.json());
  
  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email, password: password }, (err, user) => {
      if (err) {
        res.status(500).send({ message: 'Error logging in' });
      } else if (!user) {
        res.status(401).send({ message: 'Invalid email or password' });
      } else {
        res.send({ message: 'Login successful' });
      }
    });
  });
  
  app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const policyNumber = req.body.policyNumber;
    const vehicleNumber = req.body.vehicleNumber;
    const user = new User({ email, password, name, policyNumber, vehicleNumber });
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: 'Error registering user' });
      } else {
        res.send({ message: 'Registration successful' });
      }
    });
  });
  
  app.post('/raise-claim', (req, res) => {
    const claimType = req.body.claimType;
    const claimDescription = req.body.claimDescription;
    const dateOfIncident = req.body.dateOfIncident;
    const locationOfIncident = req.body.locationOfIncident;
    const policyNumber = req.body.policyNumber;
    const vehicleNumber = req.body.vehicleNumber;
    const claim = new Claim({ claimType, claimDescription, dateOfIncident, locationOfIncident, policyNumber, vehicleNumber });
    claim.save((err) => {
      if (err) {
        res.status(500).send({ message: 'Error raising claim' });
      } else {
        res.send({ message: 'Claim raised successfully' });
      }
    });
  });
  
  app.get('/view-claims', (req, res) => {
    Claim.find({}, (err, claims) => {
      if (err) {
        res.status(500).send({ message: 'Error fetching claims' });
      } else {
        res.send(claims);
      }
    });
  });
  
  app.get('/view-policy', (req, res) => {
    const policyNumber = req.query.policyNumber;
    User.findOne({ policyNumber: policyNumber }, (err, user) => {
      if (err) {
        res.status(500).send({ message: 'Error fetching policy' });
      } else if (!user) {
        res.status(404).send({ message: 'Policy not found' });
      } else {
        res.send(user);
      }
    });
  });
          
app.listen(port, () => console.log(`App listening on port ${port}!`));