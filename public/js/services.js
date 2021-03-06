/**
 * Created by TAODELL on 2014/11/6.
 */

'use strict';

var services = angular.module('eWash.services',
    ['ngResource']);

services.factory('UserService', function($resource) {
    return $resource('/api/v1/users/:id', {id: '@id'});
});

services.factory('OrderService', function($resource) {
    return $resource('/api/v1/orders/id/:id', {id: '@id'});
});

services.factory('LoginService',function($resource) {
        var user = {
            isLogin : false,
            login : '',
            mobile: ''
        };
        return user;
    });
