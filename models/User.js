const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "Can't be blank"]},
    password: {type: String, required: ["Can't be blank"]}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;