var express = require('express');
var router = express.Router();

router.post('/index', (req, res) => {
    res.json({
        success: true,
        orders: [
            {id: 1, number: 20001, status: 'Open'},
            {id: 2, number: 20002, status: 'Completely paid'}
        ]
    });
});

module.exports = router;