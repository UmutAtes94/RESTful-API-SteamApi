//----SCHEMA TO USER LOGIN-------
//________________________________
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true //birden fazla aynı username olamayacağı için
    },
    password: {
        type: String,
        minlength: 5,
    }
});

module.exports = mongoose.model('user', UserSchema);