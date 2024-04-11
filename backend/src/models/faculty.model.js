import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../utils/passwordEncryption.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtGeneration.js';

const facultySchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
           
        },
        username: {
            type: String,
            lowercase: true,
           
            trim: true,
           
        },
        email: {
            type: String,
            required: true,
           
            lowercase: true,
            trim: true
        },
        firstTime: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            default: "Faculty"
        },
        deparment: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        avatar:{
            type: String
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
            }
        ],
        participatedEvents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            }
        ],
        refreshToken: {
            type: String
        },
        isVerified : {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

const passwordEncryption = async function(next) {
    console.log("password encrytion ")
    if(this.isModified("password")) {
        this.password = await hashPassword(this.password);
        next();
    }
    else{
        next();
    }
}

facultySchema.pre("save", passwordEncryption);

//method for comparing password
facultySchema.methods.isPasswordCorrect = async function(textPassword) {
    return await comparePassword(textPassword, this.password);
}

//generating access and refresh tokens
facultySchema.methods.generateAccessTokens = function() {
    return generateAccessToken(this);
}

facultySchema.methods.generateRefreshToken = function () {
    return generateRefreshToken(this);
}

export const Faculty = mongoose.model("Faculty", facultySchema);