const Product = require('../models/Product');

const DUMMY_PRODUCTS = [
    {
        name: "Iphone 15 Pro",
        price: 139000,
        desc: "Iphone 15 Pro has display 6.1-inch touchscreen with a 120 Hz refresh rate and a resolution of 1179 x 2556 pixels. Processor: Apple A17 Pro chipset.",
        imgUrl: "https://plus.unsplash.com/premium_photo-1681313824743-7b5a2a635938?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lfGVufDB8fDB8fHww"
    },
    {
        name: "MacBook Pro",
        price: 255400,
        desc: "Apple MacBook Pro has 13.30-inch display that has a resolution of 2560x1600 pixels. Powered by a Core i5 processor and it comes with 12GB of RAM.",
        imgUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        name: "Apple Watch Ultra 2",
        price: 89900,
        desc: "Apple Watch Ultra has tough 49mm titanium case with customisable Action button. The most accurate GPS in a sports watch in dense urban environments.",
        imgUrl: "https://images.unsplash.com/photo-1664610225312-ba25cd8dbe5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB3YXRjaCUyMHVsdHJhfGVufDB8fDB8fHww"
    },
    {
        name: "iPad Pro",
        price: 157800,
        desc: "The iPad Pro is a series of tablet computers from Apple. It's a premium model of the iPad and runs iPadOS, a tablet-optimized version",
        imgUrl: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aVBhZCUyMFByb3xlbnwwfDB8MHx8fDA%3D"
    },
    {
        name: "AirPods 3rd generation",
        price: 19900,
        desc: "The Apple AirPods 3rd generation are wireless earbuds that feature a new design, improved sound, and longer battery life.",
        imgUrl: "https://images.unsplash.com/photo-1643479802396-8260177ffcb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWlycG9kcyUyMDN8ZW58MHwwfDB8fHww"
    },
    {
        name: "AirPods Max",
        price: 59900,
        desc: "AirPods Max are over-ear headphones that use computational audio to optimize listening. Available in five colors:Space Gray, Silver, Sky Blue, Green, and Pink.",
        imgUrl: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWlycG9kcyUyMG1heHxlbnwwfDB8MHx8fDA%3D"
    },
    {
        name: "Apple TV 4K",
        price: 16900,
        desc: "The Apple TV 4K is a smart home hub that can control and provide remote access to connected accessories. It also offers access to a wide range of streaming services.",
        imgUrl: "https://images.unsplash.com/photo-1621685950846-9323d993bbf3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB0dnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        name: "HomePod",
        price: 32900,
        desc: "The HomePod is a smart speaker developed by Apple that uses Siri to provide voice control. Used for music, podcasts, and phone calls.",
        imgUrl: "https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZVBvZHxlbnwwfDB8MHx8fDA%3D"
    }
]


async function seedProducts() {
    await Product.deleteMany();
    await Product.insertMany(DUMMY_PRODUCTS);
    console.log('DB Seeded');
}

module.exports = seedProducts;