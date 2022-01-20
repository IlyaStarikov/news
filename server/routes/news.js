var express = require('express');
var router = express.Router();
const newsController = require('../controllers/newsController')

/* GET users listing. */
router.get('/', newsController.getAllNews);
router.post('/', newsController.createNews);

module.exports = router;