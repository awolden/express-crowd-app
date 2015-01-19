'use strict';

var express = require('express');
var router = express.Router();

var authControllers = require("../controllers/authentication");


/* Accept login post request */
router.post('/login', authControllers.login);

/* Accept logut get request */
router.get('/logout', authControllers.logout);

module.exports = router;