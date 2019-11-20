import mongoose, {Schema, Document} from 'mongoose';
const validator = require('validator');
const UserType = require('../enums/UserType');

export interface IUser extends Document {
    email: string,
    password_hash: string,
    first_name: string,
    last_name: string,
    phone_number: number,
    type: string
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required : true,
        lowercase: true,
        // validate: (value: string) => {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Invalid Email address')
        //     }
        // }
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
    phone_number:{
        type: String,
        required : true,
        trim: true,
        // validate: (value: number) => {
        //     if (!validator.isMobilePhone(value)) {
        //         throw new Error('Invalid Phone Number')
        //     }
        // }
    },
    type: {
        type: String,
        required : true,
        trim : true,
        // validate: (value: string) => {
        //     if (!UserType.getValue(value)) {
        //         throw new Error('Invalid User Type. Allowed Types: [' + UserType.enums +']');
        //     }
        // }
    }
})

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
