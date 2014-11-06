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
        .when('/login',{
            templateUrl: 'partials/login.html',
            controller:'LoginController'
        })
        .when('/signup',{
            templateUrl: 'partials/signup.html',
            controller:'SignupController'
        })
        .when('/order',{
            templateUrl: 'partials/order.html',
            controller:'OrderController'
        })
        .when('/myaccount',{
            templateUrl: 'partials/myaccount.html',
            controller:'MyaccountController'
        });

}]);

app.con
