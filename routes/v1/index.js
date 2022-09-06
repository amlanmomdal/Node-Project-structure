var express = require('express');
var router = express.Router();

const multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


const AdminController = require('../../Controller/Auth/Admin');
// const UserController = require('../../Controller/Auth/User')
const middleware = require('../../service/middleware').middleware;

/** ================================= without login url ================================= */
// define seperated route
const AdminRoute = require('./admin')
// const UserRoute = require('./user')


// admin login register sec 
router.post('/admin/login', AdminController.login);
router.post('/admin/register', AdminController.register);

// User login register sec
// router.post('/user/register', UserController.register);
// router.post('/user/login', UserController.login);
/** ================================= without login url ================================= */

router.use(middleware); // ========> auth setup 

/** ================================= Admin section ================================ */
router.get('/admin', AdminController.getProfile);
router.put('/admin', AdminController.update);
router.put('/admin/password', AdminController.passwordChange);
router.post('/admin/upload', upload.single("image"), AdminController.imageUpload);
router.use('/admin', AdminRoute);

/** ================================= User section ================================ */
// router.get('/user', AdminController.getProfile);
// router.use('/user', UserRoute);


module.exports = router;