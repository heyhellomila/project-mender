const mongoose = require('mongoose');
const validator = require('validator');
const WorkOrderType = require('../enums/WorkOrderType')

const WorkOrderSchema = mongoose.Schema({
    _id: {
        type : String,
        required : true
    },

    sector: {
        type: String,
        required : true
    }

    type: {
        type: String,
        required : true,
        validate : value => {
            if (!PropertyType.getValue(value)) {
                throw new Error('Invalid Property Type. Allowed Types: [' + PropertyType.enums + ']');
            }
        }
    },

    title: {
        type: String,
        required: true,
    },

    price_estimate

})

module.exports = mongoose.model('WorkOrder', WorkOrderSchema);

