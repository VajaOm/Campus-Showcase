import mongoose from 'mongoose';
import { hashPassword, comparePassword } from "../utils/passwordEncryption.js";
import { generateAccessToken, generateRefreshToken } from '../utils/jwtGeneration.js';

const studentSchema = mongoose.Schema(
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
        enrollmentNo: {
            type: Number
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
        year: {
            type: Number
        },
        semester: {
            type: Number
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
                ref: "project"
            }
        ],
        participatedEvents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "event"
            }
        ],
        refreshToken: {
            type: String
        }
    }, 
    {timestamps : true}
    
    );

    const passwordEncryption = async function(next) {
        if(this.isModified("password")) {
            this.password = await hashPassword(this.password);
            next();
        }
        else{
            next();
        }
    };

    studentSchema.pre("save", passwordEncryption);

    //method for comparing password
    studentSchema.methods.isPasswordCorrect = async function(textPassword) {
        return await comparePassword(textPassword, this.password);
    }

    //generating access and refresh tokens
    studentSchema.methods.generateAccessTokens = function() {
        return generateAccessToken(this);
    }

    studentSchema.methods.generateRefreshToken = function () {
        return generateRefreshToken(this);
    }


export const Student = mongoose.model("Student", studentSchema);