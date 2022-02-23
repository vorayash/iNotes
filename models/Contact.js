const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('contact', ContactSchema);