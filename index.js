'use strict';

/* handles clustering of express app */

var cluster = require('cluster'),
    os = require('os');

cluster.setupMaster({
    exec: "./bin/www",
});

console.log("Starting Children: ");
var numOfChildren = 1;
if (cluster.isMaster) {
    for (var i = 0; i < numOfChildren; i++) {
        console.log("Starting Child: " + i);
        cluster.fork();
    }
}