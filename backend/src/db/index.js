import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


const connectionDB = async () => {
    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECT_URL}/${DB_NAME}`);
        console.log(`connection successfull to database : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("Mongodb Connection failed : ", error);
        process.exit(1);
    }
}

export default connectionDB;