import mongoose, {Schema, Document} from 'mongoose';

export interface IProperty extends Document {
    user_id: string,
    name: string,
    type: string,
    address: string,
    status: string
}

const PropertySchema: Schema = new Schema({
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
        // validate : (value: string) => {
        //     if (!PropertyType.getValue(value)) {
        //         throw new Error('Invalid Property Type. Allowed Types: [' + PropertyType.enums + ']');
        //     }
        // }
    },
    address: {
        type: String,
        required: true,
        trim : true
    },
    status: {
        type: String,
        required : true,
        trim : true,
        // validate: (value: string) => {
        //     if (!Status.getValue(value)) {
        //         throw new Error('Invalid Status. Allowed Statuses: [' + Status.enums +']');
        //     }
        // }
    }
})

const Property = mongoose.model<IProperty>('Property', PropertySchema);
export default Property;
