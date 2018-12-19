var express = require('express');
var router = express.Router();
var orderRouter = require('./orders');

router.post('/home/index', (req, res) => {
    // const name = req.body.params.
    res.json({success: true, msg: `Hello ${req.body.name}!`});
});

router.use('/orders', orderRouter);

module.exports = router;