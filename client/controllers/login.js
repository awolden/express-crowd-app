"use strict";

module.exports = ['$scope', 'Auth',
    function ($scope, Auth) {

        $scope.status = "";
        $scope.error = "";

        $scope.authenticate = function () {
            console.log("authentications");

            if (!$scope.username || !$scope.password) return;

            Auth.login($scope.username, $scope.password).then(function (user) {
                console.log("success!", user);
            }, function (err) {
                console.log("err!", err);
            });
        };


    }
];