const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://yadavpankaj092785:O5CKKPf56NJaGDyi@cluster0.dp7un9n.mongodb.net/authtest')
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