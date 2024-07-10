const mongoose = require('mongoose');


mongoose
    .connect('mongodb://127.0.0.1:27017/authtest')
    .then(() => console.log("Connected"))
    .catch(() => console.log("Error"));

const authSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
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