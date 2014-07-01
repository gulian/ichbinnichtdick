angular.module('ibnd', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'nvd3ChartDirectives'
]).config(function($routeProvider, $locationProvider, $httpProvider) {

    'use strict';

    $httpProvider.responseInterceptors.push(['$rootScope', '$q', '$location',
        function(scope, $q, $location) {
            function success(response) {
                return response;
            }
            function error(response) {
                var status = response.status;
                if (status == 401) {
                    $location.url('/login');
                }
                return $q.reject(response);
            }
            return function(promise) {
                return promise.then(success, error);
            };
        }
    ]);

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/loggedin').success(function(user) {
            if (user !== '0') {
                $rootScope.loggedUsername = user.username ;
                $timeout(deferred.resolve, 0);
            } else {
                $timeout(function() {
                    deferred.reject();
                }, 0);
                $location.url('/login');
            }
        });

        return deferred.promise;
    };


    $routeProvider.when('/', {
        templateUrl: 'partials/hits.html',
        controller: 'hitsController',
        resolve: {
            loggedin: checkLoggedin
        }
    }).when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    }).otherwise({
        redirectTo: '/'
    });

});
