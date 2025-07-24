import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        
    },
    password: {
        type: String,

    }

}, { timestamps: true })




const User = mongoose.model('User', UserSchema);
export default User;