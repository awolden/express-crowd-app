'use strict';

require('../bower_components/angular/angular.js');
require('../bower_components/angular-route/angular-route.js');
require('../bower_components/jquery/dist/jquery.min.js');
require('../bower_components/bootstrap/dist/js/bootstrap.js');
//require('underscore');

/*
Main App.js for user admin functionality
*/

/* global window, angular */

//define app
var app = angular.module('crowd-app', ['ngRoute']);

app.constant("CROWD_USER", window.user);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: '/partials/login.html',
            controller: 'login'
        }).
        otherwise({
            templateUrl: '/partials/app-home.html',
            redirectTo: '/'
        });
    }
]);

//import directives and controllers
app.controller(require('./controllers'));
app.factory(require('./factories'));


//Global Angular Code
app.run(['$rootScope', '$location', 'Auth',
    function ($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function (event) {

            //redirect to login page if not logged in
            if (!Auth.isLoggedIn()) {
                console.log("not logged in, redirecting...");
                $location.path('/login');
            }
            else {
                //do nothing
            }
        });

    }
]);






//assign directives and controllers
// app.filter(filters);

// app.controller(controllers);