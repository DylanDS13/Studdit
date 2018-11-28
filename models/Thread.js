const mongoose = require('mongoose');

let ThreadSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Can't be blank"]},
    content: {type: String, required: [true, "Can't be blank"]}
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;