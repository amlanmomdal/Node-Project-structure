var express = require('express');
var router = express.Router();

// define all controller 
// const CategoryController = require('../../Controller/Admin/E-cecommerce/Category')

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
























/** ================================= Event section STOP ================================ */

module.exports = router;