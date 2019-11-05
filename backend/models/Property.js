const mongoose = require('mongoose');
const validator = require('validator');
const PropertyType = require('../enums/PropertyType');

const PropertySchema = mongoose.Schema({
    _id: {
        type : String,
        required : true,
        trim : true
    },

    _user_id: {
        type: String,
        required : true,
        trim : true
    },
    name: {
        type: String,
        required : true,
        trim : true
    },

    address: {
        type: String,
        required: true,
        trim : true
    },
})

module.exports = mongoose.model('Property', PropertySchema);