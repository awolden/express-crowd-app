'use strict';

require('../bower_components/angular/angular.js');
require('../bower_components/jquery/dist/jquery.min.js');
require('../bower_components/bootstrap/dist/js/bootstrap.js');
require('underscore');

/*
Main App.js for user admin functionality
*/

/* global window, angular */

//define app
var app = angular.module('crowd-app', []);

app.constant("CROWD_USER", window.user);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: '/partials/login.html',
            controller: 'login'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

app.run(function () {});

app.config(['growlProvider',
    function (growlProvider) {
        growlProvider.globalTimeToLive(10000);
    }
]);


//import directives and controllers
app.controller(require('./controllers'));

//assign directives and controllers
// app.filter(filters);
// app.factory("userModel", userModel);
// app.controller(controllers);