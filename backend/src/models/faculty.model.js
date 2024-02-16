import mongoose from 'mongoose';

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
        ]
    },
    {timestamps: true}
);

export const Faculty = mongoose.model("Faculty", facultySchema);