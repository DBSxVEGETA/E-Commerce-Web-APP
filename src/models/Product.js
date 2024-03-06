const mongoose = require("mongoose");
const Review = require("./Review");



const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    imgUrl: {
        type: String
    },
    desc: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    avgRating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, { versionKey: false })



//mongoose middleware function to delete all the associated reviews on a product
productSchema.post('findOneAndDelete', async function (product) {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } })
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
