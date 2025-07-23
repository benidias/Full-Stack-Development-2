import mongoose from "mongoose"

const AgentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        
    },
    region: {
        type: String,
        enum:{
            values:['north', 'south', 'east', 'west'],
            message: '{VALUE} is not supported'
        },
        

    },
    rating: {
        type: Number,
        min: 0,
        max: 100
    },
    fee: {
        type: Number,
        min: 0
    }

}, { timestamps: true })




const Agent = mongoose.model('Employee', AgentSchema);
export default Agent;