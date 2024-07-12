const express = require('express');
const app = express();
const { User, Claim } = require('./db/db');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Joi = require('joi');

app.use(bodyParser.json());

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  policyNumber: Joi.string().required(),
  vehicleNumber: Joi.string().required()
});

const claimSchema = Joi.object().keys({
  claimType: Joi.string().required(),
  claimDescription: Joi.string().required(),
  dateOfIncident: Joi.date().required(),
  locationOfIncident: Joi.string().required(),
  policyNumber: Joi.string().required(),
  vehicleNumber: Joi.string().required()
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send({ message: 'Invalid email or password' });
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).send({ message: 'Invalid email or password' });
      } else {
        res.send({ message: 'Login successful' });
      }
    }
  } catch (err) {
    res.status(500).send({ message: 'Error logging in' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).send({ message: 'Invalid request' });
    } else {
      const { email, password, name, policyNumber, vehicleNumber } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name, policyNumber, vehicleNumber });
      await user.save();
      res.send({ message: 'Registration successful' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error registering user' });
  }
});

app.get('/dashboard', async (req, res) => {
  try {
    const { error } = Joi.object().keys({
      name: Joi.string().required(),
      policyNumber: Joi.string().required(),
      vehicleNumber: Joi.string().required()
    }).validate(req.query);
    if (error) {
      res.status(400).send({ message: 'Invalid request' });
    } else {
      const { name, policyNumber, vehicleNumber } = req.query;
      const user = await User.findOne({ name, policyNumber, vehicleNumber });
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.send({ name: user.name, policyNumber: user.policyNumber, vehicleNumber: user.vehicleNumber });
      }
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching user' });
  }
});

app.post('/raise-claim', async (req, res) => {
  try {
    const { error } = claimSchema.validate(req.body);
    if (error) {
      res.status(400).send({ message: 'Invalid request' });
    } else {
      const { claimType, claimDescription, dateOfIncident, locationOfIncident, policyNumber, vehicleNumber } = req.body;
      const claim = new Claim({ claimType, claimDescription, dateOfIncident, locationOfIncident, policyNumber, vehicleNumber });
      await claim.save();
      res.send({ message: 'Claim raised successfully' });
    }
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
    const { error } = Joi.object().keys({
      policyNumber: Joi.string().required(),
      vehicleNumber: Joi.string().required()
    }).validate(req.query);
    if (error) {
      res.status(400).send({ message: 'Invalid request' });
    } else {
      const { policyNumber, vehicleNumber } = req.query;
      const claim = await Claim.findOne({ policyNumber, vehicleNumber });
      if (!claim) {
        res.status(404).send({ message: 'Policy not found' });
      } else {
        res.send({ policyNumber: claim.policyNumber, vehicleNumber: claim.vehicleNumber });
      }
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching policy' });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));