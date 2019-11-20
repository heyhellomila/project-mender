"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const WorkOrderType = require('../enums/WorkOrderType');
const SectorType = require('../enums/SectorType');
const PriorityType = require('../enums/PriorityType');
const WorkOrderSchema = new mongoose_1.Schema({
    property_id: {
        type: String,
        required: true,
        trim: true
    },
    sector: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    cause: {
        type: String,
        required: true,
        trim: true
    },
    service_needed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    // imageURL : String,
    // image:  /// Image Data Type: Binary? Uncertain. Other alt: using Middleware Multer to upload photo on server side.
    //     { data : Buffer, 
    //       contentType : String 
    //     },
    due_date: {
        type: Date
    },
    date_completed: {
        type: Date
    },
    price_estimate: {
        type: Number // Double data type doesn't exist
    },
    actual_cost: {
        type: Number // Double data type doesn't exist
    }
});
const WorkOrder = mongoose_1.default.model('WorkOrder', WorkOrderSchema);
exports.default = WorkOrder;
//# sourceMappingURL=WorkOrder.js.map