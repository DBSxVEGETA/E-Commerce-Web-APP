const app = require('./app');
const DB = require('./data-source');
// const seedProducts = require('./seeds/productsSeed')


const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await DB.connectToDatabase();
        // await seedProducts();
        console.log('Database Connection Open!!!');
        app.listen(PORT, () => {
            console.log(`Express server started at PORT: ${PORT}`);
        })
    }
    catch (e) {
        console.log('Cannot start the server at the moment', e);
    }
})()



