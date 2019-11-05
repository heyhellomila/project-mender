const mongoose = require('mongoose');
const validator = require('validator');
const WorkOrderType = require('../enums/WorkOrderType')

const WorkOrderSchema = mongoose.Schema({
    _id: {
        type : String,
        required : true,
        trim : true
    },

    sector: {
        type : String,
        required : true,
        trim : true
    },

    type: {
        type: String,
        required : true,
        trim : true,
        validate : value => {
            if (!PropertyType.getValue(value)) {
                throw new Error('Invalid Property Type. Allowed Types: [' + PropertyType.enums + ']');
            }
        }
    },

    title: {
        type : String,
        required : true,
        trim : true
    },

    cause: {
        type : String,
        required : true,
        trim : true
    },

    service_needed: {
        type : Boolean,
        default: false
    },

    priority: {
        type : String,
        required : true,
        trim : true
    },

    description: {
        type : String,
        required : true,
        trim : true
    },

    imageURL : String,

    image:  /// Image Data Type: Binary? Uncertain. Other alt: using Middleware Multer to upload photo on server side.
        { data : Buffer, 
          contentType : String 
        },

    property_id: {
        type : String,
        required : true,
        trim : true
    },

    due_date: {
        type: Date
    },
    
    date_completed: {
        type : Date
    },

    price_estimate: {
        type: Number // Double data type doesn't exist
    },

    actual_cost: {
        type: Number // Double data type doesn't exist
    }
});

module.exports = mongoose.model('WorkOrder', WorkOrderSchema);

