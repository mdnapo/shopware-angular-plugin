var express = require('express');
var router = express.Router();
var shopware_angular_router = require('./shopware_angular_plugin_app');

router.use('/shopware_angular_plugin_app/index', shopware_angular_router);

module.exports = router;
