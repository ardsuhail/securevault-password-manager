import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const PuserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    // username: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        // default: "https://res.cloudinary.com/dxqj1k6zv/image/upload/v1735681234/default-profile-picture.png",
    },
//   gender: {
//     type: String,
//     enum: ["male", "female", "other"], // optional: restrict values
//   },
//   dob: {
//     type: Date,
//   },
//   phone: {
//     type: String,
//     // unique: true  // yeh optional hai, kyunki bohot users phone na bhi de
//   }
    },{ timestamps: true });

export default mongoose.models.Puser || mongoose.model("Puser", PuserSchema);