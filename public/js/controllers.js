/**
 * Created by TAODELL on 2014/11/5.
 */

var Controllers = angular.module('Controllers', []);
var user = {
    isLogin : false,
    login : '',
    mobile: ''
};

Controllers.controller('HomeController', ['$scope', '$http', '$location',
    function($scope, $http, $location){
        $scope.login = user.isLogin;
    }]);

Controllers.controller('LoginController', ['$scope', '$http', '$location',
    function($scope, $http, $location){
        $scope.submit_login = function($scope){
            console.log('Login');
            user.isLogin = true;
            $location.path('/');
        }
    }]);

Controllers.controller('OrderController', ['$scope', '$http',
    function($scope, $http){

    }]);

Controllers.controller('MyaccountController', ['$scope', '$http',
    function($scope, $http){

    }]);

