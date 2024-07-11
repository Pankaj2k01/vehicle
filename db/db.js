const mongoose = require('mongoose');
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI;

mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connected"))
    .catch(() => console.log("Error"))

const authSchema = new mongoose.Schema({

    
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
});

const auth = mongoose.model('auth', authSchema, 'creds');

module.exports = auth;