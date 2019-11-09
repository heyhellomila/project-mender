const mongoose = require('mongoose');
const PropertyType = require('../enums/PropertyType');

const PropertySchema = mongoose.Schema({
    user_id: {
        type: String,
        required : true,
        trim : true
    },
    name: {
        type: String,
        required : true,
        trim : true
    },

    type: {
        type: String,
        required: true,
        trim: true,
        validate : value => {
            if (!PropertyType.getValue(value)) {
                throw new Error('Invalid Property Type. Allowed Types: [' + PropertyType.enums + ']');
            }
        }
    },

    address: {
        type: String,
        required: true,
        trim : true
    },
})

module.exports = mongoose.model('Property', PropertySchema);