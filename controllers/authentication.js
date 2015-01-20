'use strict';


var self = {},
    util = require('util');


self.login = function (req, res) {

    //validate body params
    //TODO: validate based on acceptable regex
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    //attempt to authenticate with crowd with the password and username provided
    req.crowd.conn.user.authenticate(req.body.username, req.body.password, function (err, result) {

        if (err) {
            var cleanError = req.crowd.parseError(err);
            console.error("Crowd Error -> ", cleanError);
            res.status('400');
            res.send(cleanError);
            return;
        }

        //User hasauthenticated and now we have
        //to create a session
        req.session.username = req.body.username;
        req.crowd.createSession(req.session).then(function () {
            res.send(req.session);
            return;
        }, function (err) {
            var cleanError = req.crowd.parseError(err);
            console.error("Crowd Error -> ", cleanError);
            res.status('400');
            res.send(cleanError);
            return;
        });

    });
};

self.logout = function (req, res) {
    if (req.session.loggedIn) {
        req.session.destroy(function (err) {
            if (err) {
                res.status(500);
                res.send({
                    'status': 'error',
                    'msg': 'Error Deleting session'
                });
                return;
            }
            res.redirect("/#/login");
            return;
        });
    }
    else {
        res.redirect("/#/login");
        return;
    }
};

module.exports = self;