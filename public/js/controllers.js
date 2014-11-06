/**
 * Created by TAODELL on 2014/11/5.
 */

var Controllers = angular.module('eWash.controllers', ['ngResource', 'eWash.services']);

Controllers.controller('HomeController', function($scope, LoginService){
        $scope.login = LoginService.isLogin;
    });

Controllers.controller('LoginController', function($scope, $http, $location){
        $scope.submit_login = function(){
            console.log('Login');
            if($scope.login_name === 'litao' ) {
                user.isLogin = true;
                $location.path('/');
            }
        }
    });

Controllers.controller('SignupController', function($scope, $http, $location, UserService){
        $scope.submit_signup = function(){
            console.log('Signup');
            UserService.save({}, {
                login: $scope.login_name,
                password: $scope.login_pswd
            });
            $location.path('/login');
        }
    });

Controllers.controller('OrderController', ['$scope', '$http',
    function($scope, $http){

    }]);

Controllers.controller('MyaccountController', ['$scope', '$http',
    function($scope, $http){

    }]);

