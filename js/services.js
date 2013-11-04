/**
 * Created by Thang on 10/29/13.
 */
var ratingSv = angular.module('ratingServices', ['ngResource']);

ratingSv.factory('Rate', ['$resource',
    function($resource){
        return $resource('rates/:rateId.json', {}, {
            query: {method:'GET', params: {rateId:'rates'}, isArray:true},
            update: {method: 'POST', params: {rateId: 'rates'}}
        });
    }]);