const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* GET users listing. */
router.patch('/profile', userController.updateProfile);
router.get('/profile', userController.getProfile);
router.get('/:id', userController.getOneUser);

module.exports = router;
