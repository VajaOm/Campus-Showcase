import mongoose, { mongo } from 'mongoose';
import { generateVerificationToken } from '../utils/jwtGeneration.js';


const userVerificationSchema = mongoose.Schema({
    id: {
        type: String
    },
    token: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'idType'

    },
    passwordToken: {
        type: String
    },
    idType: {
        type: String,
        enum: ['Student', 'Faculty'] // Specify possible values for idType
    }
}, { Timestamps: true });




export const UserVerification = mongoose.model("UserVerification", userVerificationSchema);