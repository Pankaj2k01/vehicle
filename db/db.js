const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI || 'mongodb+srv://yadavpankaj092785:O5CKKPf56NJaGDyi@cluster0.dp7un9n.mongodb.net/authtest';

mongoose
    .connect('mongo_uri', {useNewUrlParser: true, useUnifiedTopology: true})
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