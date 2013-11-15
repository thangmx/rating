/**
 * Created by Thang on 10/29/13.
 */
var ratingSv = angular.module('ratingServices', ['ngResource']);

ratingSv.factory('Rate', ['$resource',
    function($resource){
        return $resource('rates/rates.json', {}, {
            query: {method:'GET'},
            update: {method: 'POST'},
            delete: {method: 'DELETE'}
        });
    }]);