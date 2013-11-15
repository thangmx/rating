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
	    $scope.$parent.updateRate(parseInt($scope.id), value);
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
	        id: '@',
                value: '=',
                onHover: '&',
                onLeave: '&'
            },
            controller: 'RatingController',
            templateUrl: 'my-rating.html',
            replace: true
        };
    })

    .controller('RatingAppCtrl', function ($scope, $http, Rate) {
        $scope.max = 10;
        $scope.isReadonly = false;
        $scope.avg = 0;
        $scope.count = 0;
	$scope.rates = [];
        
	$scope.update = function(data) {
             var sum = 0;
	     $scope.rates = [];
             for (var key in data) {
		if (data.hasOwnProperty(key) && key !== "$promise" && key !== "$resolved") {      
		  sum += data[key].value;
		  $scope.count++;
		  $scope.rates.push(data[key]);
		};		
	     }
	     $scope.avg = sum / $scope.rates.length;
	     $scope.count = $scope.rates.length;
        };
	
	Rate.query({}, $scope.update);

	$scope.deleteRate = function(value) {
	    Rate.delete({id:value}, function() {
		Rate.query({}, $scope.update);
	    });
	};
	
	$scope.addRate = function() {
	    var ratee = {};          
	    ratee.id = -1;
	    ratee.value = 0;
	    
	    Rate.update({}, ratee, function() {
		Rate.query({}, $scope.update);
	    });	
	};
	
	$scope.updateRate = function(id, value) {
	    var ratee = {};
            ratee.id = id;
            ratee.value = value;

            Rate.update({}, ratee, function() {
		Rate.query({}, $scope.update);
	    });
	};
});