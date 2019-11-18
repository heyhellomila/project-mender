const mongoose = require('mongoose');

const ShoppingListSchema = mongoose.Schema({
    workOrder_id: {
        type: String,
        required: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },
    
    quantity: {
        type: Number // Double data type doesn't exist
    },

    price: {
        type: Number // Double data type doesn't exist
    }
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);