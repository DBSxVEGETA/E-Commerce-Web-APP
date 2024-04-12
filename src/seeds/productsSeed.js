const Product = require('../models/Product');

const DUMMY_PRODUCTS = [
    {
        name: "Iphone 15 Pro",
        price: 139000,
        desc: "Iphone 15 Pro has display 6.1-inch touchscreen with a 120 Hz refresh rate and a resolution of 1179 x 2556 pixels. Processor: Apple A17 Pro chipset.",
        imgUrl: "https://images.unsplash.com/photo-1695619575284-72db5dd6439e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTUlMjBwcm98ZW58MHx8MHx8fDA%3D",
        discount: 10,
        discountedPrice: 125100
    },
    {
        name: "MacBook Pro",
        price: 255400,
        desc: "The MacBook Pro is a line of Mac laptops that Apple developed and manufactures. The MacBook Pro is designed for professionals. ",
        imgUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
        discount: 5,
        discountedPrice: 242630
    },
    {
        name: "Apple Watch Ultra 2",
        price: 89900,
        desc: "The Apple Watch Ultra 2 is a stylish wristwatch that serves as a personal assistant, fitness tracker, and communication tool all in one.",
        imgUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ultra-band-unselect-gallery-1-202309_GEO_BR?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1693544498074",
        discount: 10,
        discountedPrice: 80910
    },
    {
        name: "iPad Pro",
        price: 157800,
        desc: "The iPad Pro is a series of tablet computers from Apple. It's a premium model of the iPad and runs iPadOS, a tablet-optimized version",
        imgUrl: "https://images.unsplash.com/photo-1588476376802-9e96f9d967f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGlwYWQlMjBwcm98ZW58MHwwfDB8fHww",
        discount: 15,
        discountedPrice: 134130
    },
    {
        name: "AirPods 3rd generation",
        price: 19900,
        desc: "The Apple AirPods 3rd generation are wireless earbuds that feature a new design, improved sound, and longer battery life.",
        imgUrl: "https://images.unsplash.com/photo-1646646440235-acf2ee3310e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        discount: 20,
        discountedPrice: 15920
    },
    {
        name: "AirPods Max",
        price: 59900,
        desc: "Apple AirPods Max are wireless over-ear headphones designed for an immersive listening experience. Sounds like an epiphany.",
        imgUrl: "https://images.unsplash.com/photo-1628116709703-c1c9ad550d36?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        discount: 15,
        discountedPrice: 50915
    },
    {
        name: "Apple TV 4K",
        price: 16900,
        desc: "Apple TV is a streaming media player that connects to your TV and lets you stream shows and movies from apps such as Netflix, Disney+ and more.",
        imgUrl: "https://images.unsplash.com/photo-1621685950846-9323d993bbf3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB0dnxlbnwwfHwwfHx8MA%3D%3D",
        discount: 20,
        discountedPrice: 13520
    },
    {
        name: "HomePod",
        price: 32900,
        desc: "The HomePod is a smart speaker developed by Apple that uses Siri to provide voice control. Used for music, podcasts, and phone calls.",
        imgUrl: "https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZVBvZHxlbnwwfDB8MHx8fDA%3D",
        discount: 25,
        discountedPrice: 24675
    }
]


async function seedProducts() {
    await Product.deleteMany();
    await Product.insertMany(DUMMY_PRODUCTS);
    console.log('DB Seeded');
}

module.exports = seedProducts;