const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 6,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 6,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(6).max(50).required(),
//         email: Joi.string().min(6).max(50).required().email(),
//         password: Joi.string().min(8).max(1024).required()
//     }
//     return Joi.validate(user, schema);
    
// }
function validateUser(user) {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
    }
    return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;