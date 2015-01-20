"use strict";

module.exports = ['$scope', 'Auth', '$location',
    function ($scope, Auth, $location) {

        $scope.status = "";
        $scope.error = "";

        $scope.authenticate = function () {
            console.log("authentications");

            if (!$scope.username || !$scope.password) return;

            Auth.login($scope.username, $scope.password).then(function (user) {
                $scope.error = "";
                $scope.status = "Success";
                $location.path("/");
            }, function (err) {
                $scope.error = err.message;
                $scope.status = "";
            });
        };


    }
];