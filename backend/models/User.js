const mongoose = require('mongoose');
const validator = require('validator');
const UserType = require('../enums/UserType');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required : true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    passwordHash: {
        type: String,
        required : true
    },
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required : true
    },
    type: {
        type: String,
        required : true,
        validate: value => {
            if (!UserType.getValue(value)) {
                throw new Error('Invalid User type. Allowed types: [' + UserType.enums +']');
            }
        }
    }
})

module.exports = mongoose.model('User', UserSchema);