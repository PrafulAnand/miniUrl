const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const urlController = require('../controllers/urls.js')

let urls = [];

router.get('/', urlController.getAllUrls() );

router.get('/:shortUrlId', urlController.redirectUrl());

router.post('/', urlController.addShorturl());















module.exports = router;