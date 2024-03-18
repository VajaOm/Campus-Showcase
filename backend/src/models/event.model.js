import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    eligibilityCriteria: {
        type: String
    },
    judgingCriteria: {
        type: String
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
}, 
    {timestamps: true});

    export const Event = mongoose.model("Event", eventSchema);