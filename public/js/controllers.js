/**
 * Created by TAODELL on 2014/11/5.
 */

var Controllers = angular.module('eWash.controllers', ['ngResource', 'eWash.services']);

Controllers.controller('HomeController', function($scope, $http, $window, UserService){
    $scope.isAuthenticated = ($window.sessionStorage.token === undefined)? false:true;

    $scope.login_tip = '请输入您的用户名和密码';
    $scope.submit_login = function(){
        $http
            .post('/authenticate', {login: $scope.login_name, password: $scope.login_pswd})
            .success(function(data, status, headers, config){
                $window.sessionStorage.token = data.token;
                $window.sessionStorage.login = $scope.login_name;

                $scope.isAuthenticated = true;
            })
            .error(function(data, status, headers, config){
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.login;
                $scope.isAuthenticated = false;
                $scope.login_tip = '账户或密码错误';
            });
    };

    $scope.logout = function(){
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.login;
        $scope.isAuthenticated = false;
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
            var postData = {
                login: $scope.login_name,
                password: $scope.login_pswd
            };
            var config = {params: {}};
            $http
                .post('/signup', postData, config)
                .success(function(data, status, headers, config){
                    console.log('SIGNUP Suceeded');
                    $location.path('/');
                })
                .error(function(data, status, headers, config){
                    console.log('SIGN UP Failed');
                    $scope.signup_tip = '创建账户失败';
                });
        }
    };
});

Controllers.controller('OrderController', function($scope, $http){

});

Controllers.controller('PlaceOrderController', function($scope, $window, UserService){
    UserService.get({id: $window.sessionStorage.login}
        , function(resp){
            $scope.order = {
                name: resp.name || '',
                mobile: resp.mobile || '',
                pick_addr: resp.addr || '',
                drop_addr: resp.addr
            };
        }, function(resp) {
        });

});

Controllers.controller('MyaccountController', function($scope, $http, $window, UserService){
    $scope.new_addr_show = false;

    UserService.get({id: $window.sessionStorage.login}
        , function(data){
            $scope.user = {
                name: data.name || '',
                mobile: data.mobile || '',
                addr: data.addr || '',
                addrs: data.addrs || []
            };
        }, function(resp) {
        });

    $scope.new_addr = function(){
        $scope.user.addrs.push({name: $scope.user.name, mobile: $scope.user.mobile, addr: $scope.user.addr});
        $scope.new_addr_show = false;
    }

    $scope.default_addr = function(index){
        $scope.item.addr = $scope.item.addrs[index].addr;
    }

    $scope.delete_addr =  function(index){
        for( var i=index; i < $scope.user.addrs.length; i++){
            $scope.user.addrs[i] = $scope.user.addrs[i+1];
        }
        $scope.user.addrs.length =  $scope.user.addrs.length - 1;
    }

    $scope.new_addr_change =  function(){
        $scope.new_addr_show = true;
    }

    $scope.submit_addr = function(){
        var postData = {
            name: $scope.user.name,
            mobile: $scope.user.mobile,
            addr: $scope.user.addr,
            addrs: $scope.user.addrs
        };
        var config = {params: {}};

        $http
            .post('/api/v1/users/' + $window.sessionStorage.login, postData, config)
            .success(function(data, status, headers, config){
                console.log('API/UPDATE');
            })
            .error(function(data, status, headers, config){
                console.log('ERRPR API/UPDATE');
            });
    };
});

