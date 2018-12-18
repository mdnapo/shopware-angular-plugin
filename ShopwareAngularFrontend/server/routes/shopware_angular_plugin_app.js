var express = require('express');
var router = express.Router();

router.post('/home/index', (req, res) => {
    res.json({success: true, msg: 'Hello world!'});
});

module.exports = router;