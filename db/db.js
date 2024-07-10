const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authtest';

mongoose
    .connect('mongodb://127.0.0.1:27017/vehicle-insurance', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Error connecting to database"));

const authSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String
});

const User = mongoose.model('authtest', authSchema, 'creds');

module.exports = {
    find: async (query) => {
        return await User.find(query).exec();
    },
    create: async (data) => {
        const user = new User(data);
        return await user.save();
    }
};