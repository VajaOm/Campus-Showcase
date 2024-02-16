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
            index: true
        },
        username: {
            type: String,
            lowercase: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        deparment: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        profilePhoto:{
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
        }
    },
    {timestamps: true}
);

const passwordEncryption = async function(next) {
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