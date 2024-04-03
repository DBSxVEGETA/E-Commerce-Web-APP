const mongoose = require('mongoose');


const dbUrl = process.env.dbUrl || 'mongodb://127.0.0.1:27017/e-commerce'

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbUrl)
    }
    catch (e) {
        await mongoose.disconnect();
        console.log('Database Connection Failed', e);
    }
}


module.exports = { connectToDatabase };