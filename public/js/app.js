/**
 * Created by TAODELL on 2014/11/5.
 */

var app = angular.module('eWash', [
    'ngRoute',
    'eWash.controllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller:'HomeController'
        })
        .when('/signup',{
            templateUrl: 'partials/signup.html',
            controller:'SignupController'
        })
        .when('/order/id/:id',{
            templateUrl: 'partials/order.html',
            controller:'OrderController'
        })
        .when('/orderlist',{
            templateUrl: 'partials/orderlist.html',
            controller:'OrderListController'
        })
        .when('/placeorder',{
            templateUrl: 'partials/placeorder.html',
            controller:'PlaceOrderController'
        })
        .when('/myaccount',{
            templateUrl: 'partials/myaccount.html',
            controller:'MyaccountController'
        });

}]);
app.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
                $location.path('/');
            }
            return $q.reject(rejection);
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

