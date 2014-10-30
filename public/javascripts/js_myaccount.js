/**
 * Created by TAODELL on 2014/10/23.
 */

var app = angular.module('myApp', []);

app.controller('MyController', function($scope, $http){
    $scope.clock = new Date();
    $scope.new_addr_show = false;

    $http.get('/api/users/litao').success(function(data, status, headers, config){
        $scope.item = { addr: data.addr, mobile: data.mobile, contact : data.contact,
            addrs:data.addrs};
        if (undefined === $scope.item.addrs) {
            $scope.item.addrs = [{contact: $scope.item.contact, mobile: $scope.item.mobile, text: $scope.item.addr}];
        }
    })

    $scope.new_addr = function(){
        $scope.item.addrs.push({contact: $scope.item.contact, mobile: $scope.item.mobile, text: $scope.item.addr});
        $scope.new_addr_show = false;
    }

    $scope.default_addr = function(index){
        $scope.item.addr = $scope.item.addrs[index].text;
    }

    $scope.delete_addr =  function(index){
        for( var i=index; i < $scope.item.addrs.length; i++){
            $scope.item.addrs[i] = $scope.item.addrs[i+1];
        }
        $scope.item.addrs.length =  $scope.item.addrs.length - 1;
    }

    $scope.new_addr_change =  function(){
        $scope.new_addr_show = true;
    }

    $scope.submit_addr = function(){
        var postData = {
            contact: $scope.item.contact,
            mobile: $scope.item.mobile,
            addr: $scope.item.addr,
            addrs: $scope.item.addrs
        };
        var config = {params: {}};
        console.log('API/UPDATE' + postData);
        $http.post('/api/users/litao', postData, config
        ).success(function(data, status, headers, config){
                console.log('API/UPDATE');
        }).error(function(data, status, headers, config){
                console.log('ERRPR API/UPDATE');
            });
    };

});

