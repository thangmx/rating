/**
 * Created by Thang on 10/29/13.
 */
define(['angular', 'angular-resource'], function (angular){
    'use strict';

    return angular.module('ratingApp.services', ['ngResource'])
        .factory('Rate', ['$resource', function($resource){
            return $resource('rates/rates.json', {}, {
                query: {method:'GET'},
                update: {method: 'POST'},
                delete: {method: 'DELETE'}
            });
        }]);
});
