import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js'

if(!DB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

if(NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error.message);
        process.exit(1);
    }
}

export default connectToDatabase