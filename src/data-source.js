const mongoose = require('mongoose');




const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
    }
    catch (e) {
        await mongoose.disconnect();
        console.log('Database Connection Failed', e);
    }
}


module.exports = { connectToDatabase };