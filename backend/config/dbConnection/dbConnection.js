import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected Successfuly")
    } catch (err) {
        console.error(err.message)
    }
}


export default connectDB;