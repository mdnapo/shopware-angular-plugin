var express = require('express');
var router = express.Router();

const app_controller = 'shopware_angular_plugin_app/index';

router.post(app_controller + '/home/index', function (req, res, next) {
    res.json({success: true, msg: 'Hello World!'});
});

module.exports = router;
