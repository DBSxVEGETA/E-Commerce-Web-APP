const express = require('express');
const router = express.Router();
const catchAsync = require('../core/catchAsync');
const { validateProduct } = require('../middlewares/validate');
const { isLoggedIn, isSeller, isProductAuthor } = require('../middlewares/auth');
const productController = require('../controllers/productController');

router.route('/')
    //display all products
    .get(catchAsync(productController.showAllProducts))
    //add a new product
    .post(isLoggedIn, isSeller, validateProduct, catchAsync(productController.createNewProduct))


//get new product page
router.get('/new', isLoggedIn, isSeller, productController.getNewProductPage)

router.route('/:id')
    // show product
    .get(catchAsync(productController.showProduct))
    //edit and update product
    .patch(isLoggedIn, isProductAuthor, validateProduct, catchAsync(productController.editProduct))
    //delete a product
    .delete(isLoggedIn, isProductAuthor, catchAsync(productController.deleteProduct))

//show edit page
router.get('/:id/edit', isLoggedIn, isProductAuthor, catchAsync(productController.showEditPage))


// router.get('/search', async (req, res) => {
//     try {
//         const searchText = req.query.searchText;
//         console.log("Search Text:", searchText);
//         // const product_data = await Product.find({ "name": { $regex: ".*" + search + ".*", $options: 'i' } })
//         // if (product_data.length > 0) {
//         //     res.send({ success: true, msg: "Product Details", data: product_data });
//         // }
//         // else {
//         //     res.send({ success: true, msg: "Product not found!" });
//         // }
//     }
//     catch (e) {
//         res.status(500).render('error', { err: e.message });
//     }

// })



module.exports = router;