const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required : true},
    contact : {type: String, required : true},
    profile : {type: String, required : false},
    registration : {type: String},
    registrationType : {type: String},
    email : {type: String},
    phone : {type: String},
    phonePoste : {type: String},
    mobile : {type: String},
    title : {type: String},
    matricule : {type: String},
    company : {type: String},
    department : {type: String},
    site : {type: String},
    local : {type: String},
    creationDate : {type: String},
    creationUser : {type: Object},
    updateDate : {type: String},
    updateUser : {type: String},
    isActive : {type: Boolean, required : true, default:1},
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);