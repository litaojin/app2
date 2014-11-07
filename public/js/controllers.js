/**
 * Created by TAODELL on 2014/11/5.
 */

var Controllers = angular.module('eWash.controllers', ['ngResource', 'eWash.services']);

Controllers.controller('HomeController', function($scope, LoginService){
        $scope.login = LoginService.isLogin;
    });

Controllers.controller('LoginController', function($scope, $http, $location, LoginService, UserService){
    $scope.login_tip = '请输入您的用户名和密码';
        $scope.submit_login = function(){
            UserService.get({login: $scope.login_name}
                , function(resp){
                    if(resp.login){
                        if(resp.password === $scope.login_pswd){
                            LoginService.isLogin = true;
                            $location.path('/');
                        }else{
                            $scope.login_tip = '密码错误';
                        }
                    }else{
                        $scope.login_tip = '用户名错误';
                    }
                } );
        }
    });

Controllers.controller('SignupController', function($scope, $http, $location, UserService){
    $scope.signup_tip = '请设置您的用户名及密码';
        $scope.submit_signup = function(){

            if( !$scope.login_name || !$scope.login_pswd || !$scope.login_pswd_confirm){
                $scope.signup_tip = '请填完所有信息';
            }else if($scope.login_pswd !== $scope.login_pswd_confirm){
                $scope.signup_tip = '密码不一致';
            }else if($scope.login_name !== encodeURIComponent($scope.login_name)){
                $scope.signup_tip = '用户名包含非法字符';
            }else if($scope.login_name !== $scope.login_name.toLowerCase()){
                $scope.signup_tip = '用户名必须是小写字母';
            }else{

                UserService.get({login: $scope.login_name
                    } , function (resp){
                        if(resp.login){
                            $scope.signup_tip = '用户名已经存在';
                        }else{
                            UserService.save({}, {
                                login: $scope.login_name,
                                password: $scope.login_pswd
                            });
                            $location.path('/login');
                        }
                    }, function(resp){

                });
            }
        }
    });

Controllers.controller('OrderController', ['$scope', '$http',
    function($scope, $http){

    }]);

Controllers.controller('MyaccountController', ['$scope', '$http',
    function($scope, $http){

    }]);

