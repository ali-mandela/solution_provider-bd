import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String, 
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
    }, 
}, {timestamps: true});

export default mongoose.model("users", userSchema);