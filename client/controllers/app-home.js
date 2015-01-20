"use strict";

module.exports = ['$scope', 'Auth', '$location',
    function ($scope, Auth, $location) {

        $scope.user = Auth.getUser();


    }
];