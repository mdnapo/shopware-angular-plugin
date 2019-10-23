var express = require('express');
var router = express.Router();
var home = require('./home');

// If this looks pretty awkward to you, I totally agree.
// But hey for testing purposes this is okay.
router.use('/shopware_angular_plugin_app/index/home', home);

module.exports = router;
