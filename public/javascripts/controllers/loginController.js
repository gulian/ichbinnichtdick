angular.module('ibnd').controller('loginController', function($scope, $http, $location) {
    'use strict';

    $scope.login = function(){
        if(!$scope.user.username || !$scope.user.password){
            return false ;
        }
        $http.post('/login',$scope.user).then(function(){
            $location.path('/');
        },function(){
            $scope.message = "Utilisateur ou mot de passe incorrect";
        });
    };
});
