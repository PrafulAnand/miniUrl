const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urls.js')


router.get('/', urlController.getAllUrls );

router.get('/:shortUrlId', urlController.redirectUrl);

router.post('/', urlController.addShorturl);

module.exports = router;















module.exports = router;