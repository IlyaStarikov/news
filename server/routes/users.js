var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/profile', userController.getProfile);
router.get('/:id', userController.getOneUser);

module.exports = router;
