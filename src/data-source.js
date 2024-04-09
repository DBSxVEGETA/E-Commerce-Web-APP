const mongoose = require('mongoose');


const MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL || 'mongodb://127.0.0.1:27017/e-commerce'

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_DATABASE_URL)
    }
    catch (e) {
        await mongoose.disconnect();
        console.log('Database Connection Failed', e);
    }
}


module.exports = { connectToDatabase };