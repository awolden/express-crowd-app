'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    console.log("HITTING THIS ROUTE???");
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;