angular.module('ibnd').controller('navbarController', function($scope, $location, $http) {

    'use strict';

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.logout = function(){
        $http.post('logout').then(function(){
            $location.path('login');
        });
    };
});
