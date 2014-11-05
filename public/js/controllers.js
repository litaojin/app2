/**
 * Created by TAODELL on 2014/11/5.
 */

var Controllers = angular.module('Controllers', []);
var user = {
    isLogin : false,
    login : '',
    mobile: ''
};

Controllers.controller('HomeController', ['$scope', '$http',
    function($scope, $http){
        $scope.login = user.isLogin;

        $scope.submit_login = function($scope){
            if($scope.login_name === 'litao'){
                user.isLogin = true;
                user.login = $scope.login_name;
            }
        }

    }]);



Controllers.controller('LoginController', ['$scope', '$http',
    function($scope, $http){

    }]);
Controllers.controller('OrderController', ['$scope', '$http',
    function($scope, $http){

    }]);
Controllers.controller('MyaccountController', ['$scope', '$http',
    function($scope, $http){

    }]);

