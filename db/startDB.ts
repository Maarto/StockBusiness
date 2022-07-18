import mongoose from 'mongoose';
import 'dotenv/config';

async function connectDatabase() {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6iud4.mongodb.net/test`);
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
}

export default connectDatabase;