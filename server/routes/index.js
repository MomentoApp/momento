const router = require('express').Router();
const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const videowithinController = require('../controllers/videowithinController');

router.get('/user', userController.get);
router.post('/user', userController.post);

router.get('/video', videoController.get);
router.post('/video', videoController.post);

router.get('/videowithin', videowithinController.get);

module.exports = router;
