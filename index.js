const express = require('express');
const app = express();
const { User, Claim } = require('./db/db');
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(401).send({ message: 'Invalid email or password' });
    } else {
      res.send({ message: 'Login successful' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error logging in' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const policyNumber = req.body.policyNumber;
    const vehicleNumber = req.body.vehicleNumber;
    const user = new User({ "email": email,"password": password, name, policyNumber, vehicleNumber });
    await user.save();
    res.send({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).send({ message: 'Error registering user' });
  }
});

app.get('/deshboard', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching user' });
  }
});

app.post('/raise-claim', async (req, res) => {
  try {
    const claimType = req.body.claimType;
    const claimDescription = req.body.claimDescription;
    const dateOfIncident = req.body.dateOfIncident;
    const locationOfIncident = req.body.locationOfIncident;
    const policyNumber = req.body.policyNumber;
    const vehicleNumber = req.body.vehicleNumber;
    const claim = new Claim({ claimType, claimDescription, dateOfIncident, locationOfIncident, policyNumber, vehicleNumber });
    await claim.save();
    res.send({ message: 'Claim raised successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error raising claim' });
  }
});

app.get('/view-claims', async (req, res) => {
  try {
    const claims = await Claim.find({});
    res.send(claims);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching claims' });
  }
});

app.get('/view-policy', async (req, res) => {
  try {
    const policyNumber = req.query.policyNumber;
    const user = await User.findOne({ policyNumber });
    if (!user) {
      res.status(404).send({ message: 'Policy not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching policy' });
  }
});
          
app.listen(port, () => console.log(`App listening on port ${port}!`));