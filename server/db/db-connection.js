import mongoose from "mongoose";
    import dotenv from 'dotenv';

    dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database connection established successfully!');
    })
    .catch(error => console.log('Database connection failed. Error:', error.message));