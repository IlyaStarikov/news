var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/:id', userController.getOneUser);

router.post('/profile', userController.getProfile);

module.exports = router;
