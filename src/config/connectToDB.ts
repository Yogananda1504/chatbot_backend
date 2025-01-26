import mongoose from "mongoose";
mongoose.set('strictQuery', false);
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async () => {
    try {
     
        const client = await mongoose.connect(process.env.MONGO_URI|| "mongodb://localhost:27017/test");

        if (client) {
            console.log("Connected to DB: ", client.connection.host);
        }
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB;