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
        
        },
        username: {
            type: String,
            lowercase: true,
            trim: true,
            
        },
        enrollmentNo: {
            type: Number
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        year: {
            type: Number
        },
        role: {
            type: String,
            default: "Student"
        },
        semester: {
            type: Number
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
                ref: "event"
            }
        ],
        refreshToken: {
            type: String
        },
        firstTime: {
            type: Boolean,
            default: true
        },
        isVerified : {
            type: Boolean,
            default: false
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
    studentSchema.methods.generateAccessTokens = function(role) {
        // console.log("student schema generateAccessTokens :::: ",role)
        return generateAccessToken(this, role);
    }

    studentSchema.methods.generateRefreshToken = function () {
        return generateRefreshToken(this, this.role);
    }


export const Student = mongoose.model("Student", studentSchema);