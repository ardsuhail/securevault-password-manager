import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const PasswordSchema = new mongoose.Schema({
     userId: { type: String, required: true },
    title: {
        type: String,
    },
    username: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true });

export default mongoose.models.Password || mongoose.model("Password", PasswordSchema);