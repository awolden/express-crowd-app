'use strict';


var self = {},
    AtlassianCrowd = require('atlassian-crowd'),
    async = require('async'),
    Q = require('q');


/* Extend base atlassian-crowd functionality */
var crowdClient = {
    conn: undefined
};

crowdClient.middleware = function (req, res, next) {
    req.crowd = crowdClient;
    next();
};

//standardize the crowd error to fit the
//form used by the rest of the application
crowdClient.parseError = function (err) {

    //var tokens = err.split(":");
    return {
        "status": "error",
        "message": err.message.split(":")[0]
    };

};


//create an express session
//returns a promise
crowdClient.createSession = function (session) {
    var deferred = Q.defer();

    //make the multiple calls needed to build all
    //necessary user data
    async.parallel([
            function (cb) {
                crowdClient.conn.user.find(session.username, cb);
            },
            function (cb) {
                crowdClient.conn.user.groups(session.username, cb);
            }
        ],
        // optional callback
        function (err, results) {

            if (err) deferred.reject(err);

            var user = results[0];
            user.groups = results[1];

            session.loggedIn = true;
            session.user = user;

            deferred.resolve();
            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.
        });


    return deferred.promise;

};




/* Create connection and export middleware */
module.exports = function (opts) {
    crowdClient.conn = new AtlassianCrowd(opts);
    crowdClient.conn.ping(function (err, response) {
        if (err) {
            console.log("Trouble Connecting with Crowd ->", err);
        }
        else {
            console.log("Successfully pinged crowd");
        }
    });
    return crowdClient.middleware;
};