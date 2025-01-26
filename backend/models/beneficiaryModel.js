import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema(
    {
        cnic: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        purpose: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Pending",
        },
        tokenNumber: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        history: [
            {
                department: String,
                action: String,
                remarks: String,
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Beneficiary = mongoose.model("Beneficiary", BeneficiarySchema);

export default Beneficiary;
