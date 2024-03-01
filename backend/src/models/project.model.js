import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tools: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    images : [
        {
            type: String
        }
    ],
    video: {
        type: String
    },
    sourceCode: [
        {
            type: String
        }
    ],
    ppt: 
        {
            type: String
        }
    ,
    owner:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    
}, { timestamps: true })


export const Project = mongoose.model("Project", projectSchema);