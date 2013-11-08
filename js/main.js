/**
 * Created by Thang on 10/21/13.
 */
var app = angular.module('ratingApp', ['ratingServices']);
app
    .constant('ratingConfig', {
        max: 5,
        stateOn: null,
        stateOff: null
    })

    .controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', 'Rate', function RatingController($scope, $attrs, $parse, ratingConfig, Rate) {

        this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
        this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
        this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;

        $scope.range = new Array(this.maxRange);

        var defaultOptions = {
            stateOn: this.stateOn,
            stateOff: this.stateOff
        };

        for (var i = 0, n = $scope.range.length; i < n; i++) {
            $scope.range[i] = angular.extend({ index: i }, defaultOptions);
        }


        $scope.rate = function(value) {
            if ( $scope.readonly || $scope.value === value) {
                return;
            }

            $scope.value = value;

            $scope.ratee = {};
            $scope.ratee.id = 1;
            $scope.ratee.value = value;

            Rate.update({}, $scope.ratee);

        };

        $scope.enter = function(value) {
            if ( ! $scope.readonly ) {
                $scope.val = value;
            }
            $scope.onHover({value: value});
        };

        $scope.reset = function() {
            $scope.val = angular.copy($scope.value);
            $scope.onLeave();
        };

        $scope.$watch('value', function(value) {
            $scope.val = value;
        });

        $scope.readonly = false;
        if ($attrs.readonly) {
            $scope.$parent.$watch($parse($attrs.readonly), function(value) {
                $scope.readonly = !!value;
            });
        }
    }])

    .directive('rating', function() {
        return {
            restrict: 'EA',
            scope: {
                id: '=',
                value: '=',
                onHover: '&',
                onLeave: '&',
                rates: '&'
            },
            controller: 'RatingController',
            templateUrl: 'my-rating.html',
            replace: true
        };
    })
    .controller('RatingAppCtrl', function ($scope, $http, Rate) {
        $scope.rate = 7;
        $scope.max = 10;
        $scope.isReadonly = false;
        $scope.id = 1;
        $scope.avg = 0;
        $scope.rateTot = 0;

         Rate.query({}, function(data) {
             $scope.rates = data;
             angular.forEach($scope.rates, function(rate) {
                 $scope.rateTot = $scope.rateTot + (rate.value);
             });

             $scope.avg = $scope.rateTot / data.length;
         });


        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };
});