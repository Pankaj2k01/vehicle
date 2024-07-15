const express = require('express');
const app = express();
const { User, Claim ,Policy} = require('./db/db');
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
    const user = new User({ "email": email,"password": password, "name": name});
    await user.save();
    res.send({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).send({ message: 'Error registering user' });
  }
});

app.patch('/change-name', async (req, res) => {
  try {
    const { email, newName } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.name = newName;
    await user.save();
    return res.send({ message: 'Name changed successfully' });
  } catch (err) {
    console.error('Error changing name:', err);
    return res.status(500).send({ message: 'Error changing name' });
  }
});


app.patch('/change-password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!(await user.comparePassword(oldPassword))) {
      return res.status(401).send({ message: 'Invalid old password' });
    }

    user.password = newPassword;
    await user.save();
    return res.send({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    return res.status(500).send({ message: 'Error changing password' });
  }
});



app.get('/dashboard', async (req, res) => {
  try {
    const email = req.query.email; // assuming you're passing the email as a query parameter
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.json({ name: user.name }); // return the user name in the response
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching user data' });
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
    const claim = await Claim.find({});
    res.send(claim);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching claims' });
  }
});

app.post('/buy-policy', async (req, res) => {
  try {
    const vehicleNumber = req.body.vehicleNumber;
    const policyStartDate = req.body.policyStartDate;
    const policyEndDate = req.body.policyEndDate;
    const policyPrice = req.body.policyPrice;
    const vehicleType = req.body.vehicleType;

    const policy = new Policy({
      vehicleNumber, policyStartDate, policyEndDate, policyPrice, vehicleType});
      await policy.save();
    res.send({ message: 'Policy purchased successfully!' });
  } catch (err) {
    res.status(500).send({ message: 'Error purchasing policy' });
  }
});

app.get('/view-policy', async (req, res) => {
  try {
    const claim = await Claim.find({});
    res.send(policy);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching policy' });
  }
});
         
app.listen(port, () => console.log(`App listening on port ${port}!`));