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
            fileName: {
                type: String,
                required: true
            },
            fileUrl: {
                type: String,
                required: true
            }
        }
    ],
    video: 
        {
            fileName: {
                type: String,
                required: true
            },
            fileUrl: {
                type: String,
                required: true
            }
        }
    ,
    sourceCode: [
        {
            fileName: {
                type: String,
                required: true
            },
            fileUrl: {
                type: String,
                required: true
             }
        }
    ],
    ppt: 
        {
            fileName: {
                type: String,
                required: true
            },
            fileUrl: {
                type: String,
                required: true
            }
        }
    ,
    owner:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    
}, { timestamps: true })


export const Project = mongoose.model("Project", projectSchema);