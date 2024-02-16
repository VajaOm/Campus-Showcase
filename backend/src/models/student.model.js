import mongoose from 'mongoose';

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

export const Student = mongoose.model("Student", studentSchema);