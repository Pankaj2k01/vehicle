const mongoose = require('mongoose');
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI 
mongoose
    .connect('mongo_uri')
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Error connecting to database"));

const authSchema = new mongoose.Schema({

    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        requied: true
    }
});

const auth = mongoose.model('auth', authSchema, 'creds');

module.exports = auth;