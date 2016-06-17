const router = require('express').Router();
const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');

router.get('/user', userController.get);
router.post('/user', userController.post);

router.get('/video', videoController.get);
router.post('/video', videoController.post);

module.exports = router;
