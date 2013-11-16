/**
 * Created by thang.mai on 11/15/13.
 */
define(['angular', 'controllers'], function(angular) {
    'use strict';

    return angular.module('ratingApp.directives',['ratingApp.controllers'])
        .directive('rating', function() {
            return {
                restrict: 'EA',
                scope: {
                    id: '@',
                    value: '=',
                    onHover: '&',
                    onLeave: '&'
                },
                controller: 'RatingCtrl',
                //templateUrl: 'my-rating.html',
                template: '<span ng-mouseleave="reset()">' +
                    '<i ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" ng-class="$index < val && (r.stateOn || \'icon-star\') || (r.stateOff || \'icon-star-empty\')"></i>' +
                    '</span>',
                replace: true
            };
        })
});