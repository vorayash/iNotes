const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
// //This will add user only if it is unique email
// User.createIndexes();
const User = mongoose.model('user', UserSchema);
module.exports = User