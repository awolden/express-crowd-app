"use strict";

/* global CROWD_USER */

module.exports = ['CROWD_USER', '$http', '$q',
    function (CROWD_USER, $http, $q) {
        var user = CROWD_USER;

        return {
            isLoggedIn: function () {
                return user && user.isLoggedIn;
            },
            login: function (username, password) {

                var deferred = $q.defer();

                $http
                    .post("/auth/login", {
                        username: username,
                        password: password
                    })
                    .success(function (data, status) {
                        user = data;
                        deferred.resolve(data);
                    })
                    .error(function (err, status) {
                        deferred.resolve(err);
                    });


                return deferred.promise;
            },
            logout: function () {
                //todo: logout
            }
        };
    }
];