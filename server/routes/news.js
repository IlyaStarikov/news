const express = require('express');

const router = express.Router();
const newsController = require('../controllers/newsController');

/* GET users listing. */
router.get('/', newsController.getAllNews);
router.post('/', newsController.createNews);

module.exports = router;
