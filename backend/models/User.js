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
    password_hash: {
        type : String,
        required : true,
        trim : true
    },
    first_name: {
        type : String,
        required : true,
        trim : true
    },
    last_name: {
        type: String,
        required : true,
        trim : true
    },
    type: {
        type: String,
        required : true,
        trim : true,
        validate: value => {
            if (!UserType.getValue(value)) {
                throw new Error('Invalid User Type. Allowed Types: [' + UserType.enums +']');
            }
        }
    }
})

module.exports = mongoose.model('User', UserSchema);