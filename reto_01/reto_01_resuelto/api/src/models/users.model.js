const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String
});

const Model = mongoose.model('User', UserSchema);

module.exports = Model;