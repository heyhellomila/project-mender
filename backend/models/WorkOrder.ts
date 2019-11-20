import mongoose, {Schema, Document} from 'mongoose';
const WorkOrderType = require('../enums/WorkOrderType')
const SectorType = require('../enums/SectorType')
const PriorityType = require('../enums/PriorityType')

export interface IWorkOrder extends Document {
    property_id: string,
    sector: string,
    type: string,
    title: string,
    cause: number,
    service_needed: boolean,
    priority: string,
    description: string,
    due_date: Date,
    date_completed: Date,
    price_estimate: number, 
    actual_cost: number
}

const WorkOrderSchema:Schema = new Schema({
    property_id: {
        type : String,
        required : true,
        trim : true
    },
    
    sector: {
        type : String,
        required : true,
        trim : true,
        // validate : (value: string) => {
        //     if (!SectorType.getValue(value)) {
        //         throw new Error('Invalid Property Type. Allowed Types: [' + SectorType.enums + ']');
        //     }
        // }
    },

    type: {
        type: String,
        required : true,
        trim : true,
        // validate : (value: string) => {
        //     if (!WorkOrderType.getValue(value)) {
        //         throw new Error('Invalid Work Order Type. Allowed Types: [' + WorkOrderType.enums + ']');
        //     }
        // }
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
        trim : true,
        // validate : (value: string) => {
        //     if (!PriorityType.getValue(value)) {
        //         throw new Error('Invalid Property Type. Allowed Types: [' + PriorityType.enums + ']');
        //     }
        // }
    },

    description: {
        type : String,
        required : true,
        trim : true
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
        type : Date
    },

    price_estimate: {
        type: Number // Double data type doesn't exist
    },

    actual_cost: {
        type: Number // Double data type doesn't exist
    }
});

const WorkOrder = mongoose.model<IWorkOrder>('WorkOrder', WorkOrderSchema);
export default WorkOrder;
