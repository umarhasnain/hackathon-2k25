import mongoose from "mongoose";



const ManagmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordTokenExpiresAt: {
        type: Date
    },
    role: {
        type: String,
        required: true,
    }
},{timestamps: true})

const Managment = mongoose.model("Management", ManagmentSchema);

export default Managment;