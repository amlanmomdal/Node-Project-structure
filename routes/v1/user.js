var express = require('express');
var router = express.Router();

// define all controller 
const productController = require('../../Controller/User/E-eeommerce/product')
const checkoutController = require('../../Controller/User/E-eeommerce/checkout')
const newsController = require('../../Controller/User/News/news')
const postController = require('../../Controller/User/Post/post')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ status: false })
});

// router.use((req, res, next) => {
//     if (req.userType == "Admin") {
//         next();
//     } else {
//         res.send({ status: false, msg: "parmison not found" });
//     }
// })

/** ================================= E-ceommerce section START ================================ */
router.get('/product', productController.viewAll);
router.get('/product/new-arrival', productController.newArrivals);
router.post('/product/category-product', productController.categoryProduct);
router.post('/product/get-subcategory', productController.viewSubCategory);
router.post('/product/send-feadback', productController.feedback);
router.post('/product/get-feadback', productController.getFeedBack);
router.post('/product/cart', productController.cart);
router.post('/product/view-cart', productController.viewCart);
router.post('/product/delete-cart/:id', productController.deleteCart);
router.post('/product/update-cart/:id', productController.updateCart);
router.get('/product/get-category', productController.getCategory);

// checkout product 
router.post('/checkout', checkoutController.checkout);
router.get('/checkout/history', checkoutController.orderHistory);




/** ================================= E-ceommerce section STOP ================================ */

/** ================================= News section START ================================ */

// news 
router.post('/news', newsController.viewAll);
router.post('/news/add-like', newsController.addLike);
router.post('/news/add-comment', newsController.addNewsComment);
router.post('/news/category-wise', newsController.viewAllCategoryWise);
router.post('/news/single', newsController.single);




/** ================================= News section STOP ================================ */

/** ================================= Post section START ================================ */
// POST
router.post('/post', postController.create);
router.post('/post/get-all', postController.viewAllPost);
router.post('/post/single', postController.singlePost);
router.post('/post/update/:id', postController.postUpdate);
router.post('/post/like', postController.addLike);
router.post('/post/comment', postController.addPostComment);
router.post('/post/comment/delete/:id', postController.postCommentDelete);
router.post('/post/comment/update/:id', postController.postCommentUpdate);
router.post('/post/create-report', postController.createReport);





/** ================================= Post section STOP ================================ */


module.exports = router;