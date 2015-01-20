"use strict";

/* global CROWD_USER */

module.exports = ['CROWD_USER', '$http', '$q',
    function (CROWD_USER, $http, $q) {
        var session = CROWD_USER;

        return {
            getUser: function () {
                return session.user;
            },
            isLoggedIn: function () {
                return session && session.loggedIn;
            },
            login: function (username, password) {

                var deferred = $q.defer();

                $http
                    .post("/auth/login", {
                        username: username,
                        password: password
                    })
                    .success(function (data, status) {
                        session = data;
                        deferred.resolve(data);
                    })
                    .error(function (err, status) {
                        deferred.reject(err);
                    });


                return deferred.promise;
            },
            logout: function () {
                //todo: logout
            }
        };
    }
];