var express = require('express');
var router = express.Router();

router.post('/greet', (req, res) => {
    res.json({success: true, msg: `Hello ${req.body.name}!`});
});

module.exports = router;
