'use strict';

/* jasmine specs for controllers go here */

describe('RatingApp controllers', function(){
   beforeEach(function(){
      this.addMatchers({
	toEqualData: function(expected) {
	  return angular.equals(this.actual, expected);
	}
      });
    });
  
  beforeEach(module('ratingApp'));
  beforeEach(module('ratingServices'));
  
  describe('RatingAppCtrl', function() {
    
      var scope, dscope, ctrl, dctrl, $httpBackend, $rootScope, $controller;
      
      beforeEach(inject(function($injector) {	
	  $httpBackend = $injector.get('$httpBackend');
	  $httpBackend.when('GET', 'rates/rates.json').respond({"1":{"id":1,"value":0},"2":{"id":2,"value":0},"3":{"id":3,"value":0},"4":{"id":4,"value":0},"5":{"id":5,"value":0}});	
	  
	  $rootScope  = $injector.get('$rootScope');
	  $controller = $injector.get('$controller');
	  scope = $rootScope.$new();
	  ctrl = $controller('RatingAppCtrl', {$scope: scope});
	 
	  
      }));
      
      it('should create "rates" model with ratings fetched from xhr', function() {	 
	  expect(scope.rates).toEqual([]);
	  
	  $httpBackend.flush();
	  expect(scope.rates).toEqualData([ { id : 1, value : 0 }, { id : 2, value : 0 }, { id : 3, value : 0 }, { id : 4, value : 0 }, { id : 5, value : 0 } ]);
      });
      
      it('should add a rating', function() {
	  $httpBackend.flush();
	  expect(scope.rates).toEqualData([ { id : 1, value : 0 }, { id : 2, value : 0 }, { id : 3, value : 0 }, { id : 4, value : 0 }, { id : 5, value : 0 } ]);
	  
	  $httpBackend.expectPOST('rates/rates.json', {"id":-1,"value":0}).respond(200, {"id": 6,"value":0});
	  $httpBackend.expectGET('rates/rates.json').respond({"1":{"id":1,"value":0},"2":{"id":2,"value":0},"3":{"id":3,"value":0},"4":{"id":4,"value":0},"5":{"id":5,"value":0},"6":{"id":6,"value":0}});

	  scope.addRate();
	  
	  $httpBackend.flush();
	  expect(scope.rates).toEqualData([ { id : 1, value : 0 }, { id : 2, value : 0 }, { id : 3, value : 0 }, { id : 4, value : 0 }, { id : 5, value : 0 }, { id : 6, value : 0 } ]);
      });
      
      it('should delete a rating', function() {
	  $httpBackend.flush();
	  expect(scope.rates).toEqualData([ { id : 1, value : 0 }, { id : 2, value : 0 }, { id : 3, value : 0 }, { id : 4, value : 0 }, { id : 5, value : 0 } ]);
	  
	  $httpBackend.expectDELETE('rates/rates.json?id=3').respond({"id":3,"value":0});
	  $httpBackend.expectGET('rates/rates.json').respond({"1":{"id":1,"value":0},"2":{"id":2,"value":0},"4":{"id":4,"value":0},"5":{"id":5,"value":0},"6":{"id":6,"value":0}});

	  scope.deleteRate(3);
	  
	  $httpBackend.flush();
	  expect(scope.rates).toEqualData([ { id : 1, value : 0 }, { id : 2, value : 0 }, { id : 4, value : 0 }, { id : 5, value : 0 }, { id : 6, value : 0 } ]);
      });
      
      it('should update a rating', function() {
	  $httpBackend.flush();
	  expect(scope.rates).toEqualData([ { id : 1, value : 0 }, { id : 2, value : 0 }, { id : 3, value : 0 }, { id : 4, value : 0 }, { id : 5, value : 0 } ]);
	  
	  $httpBackend.expectPOST('rates/rates.json', {"id":3,"value":7}).respond(200, {"id": 3,"value":7});
	  $httpBackend.expectGET('rates/rates.json').respond({"1":{"id":1,"value":0},"2":{"id":2,"value":0},"3":{"id":3,"value":7},"4":{"id":4,"value":0},"5":{"id":5,"value":0}});
	  
	  scope.updateRate(3, 7);
	  
	  $httpBackend.flush();
	  expect(scope.rates).toEqualData([ { id : 1, value : 0 }, { id : 2, value : 0 }, { id : 3, value : 7 }, { id : 4, value : 0 }, { id : 5, value : 0 }]);
      });
      
      
  });

  describe('rating', function() {
      var elm, scope, $compile;
    
      
      beforeEach(inject(function($injector) {
	  scope  = $injector.get('$rootScope');
	  $compile  = $injector.get('$compile');
	  var $httpBackend = $injector.get('$httpBackend');
	  $httpBackend.when('GET', 'my-rating.html').respond('<span ng-mouseleave="reset()">' +
				'<i ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" ng-class="$index < val && (r.stateOn || \'icon-star\') || (r.stateOff || \'icon-star-empty\')"></i>' +
			      '</span>');	  
	  elm = angular.element('<rating id="1" value="toto" max="10" readonly="false"></rating>');
	 
	  $compile(elm)(scope);
	  scope.$digest();
      }));
      
      it('should have id and value', function() {

	  var star = elm.find("span[id='1'] > i[class~='icon-star']");
	  scope.$apply(function() {
	    //scope.rate = { id : 1, value : 4 };
	    elm.scope().range = new Array(10);
	    scope.toto = 4;	  
	  });

	  expect(star.length).toBe(4);
      });
  });

  describe('RatingController', function() {	
      var scope, ctrl, $rootScope, $controller, attrs;
      var foo, bar = null;
      
      beforeEach(inject(function($injector) {	
	  
	  $rootScope  = $injector.get('$rootScope');
	  $controller = $injector.get('$controller');
	  scope = $rootScope.$new();
	  attrs = {
	    readonly: false,
	    max: 10,
	    stateOff: null,
	    stateOn: null
	  };
	  ctrl = $controller('RatingController', {$scope: scope, $attrs: attrs});
	 
	  scope.id = "3";
	  scope.value = 4;
	  scope.readonly = false;
      }));
      
      it('should pass id as number to updateRate function', function() {		
	  $rootScope.updateRate = function (id, value) {};
	  spyOn($rootScope, 'updateRate'); 
	  scope.rate(7);
	  expect($rootScope.updateRate).toHaveBeenCalledWith(3, 7);
      });
      
      it('should pass id as number to updateRate function', function() {		
	var typeOfId;
	  $rootScope.updateRate = function (id, value) { typeOfId = typeof(id); };	 
	  scope.rate(7);
	  expect(typeOfId).toBe('number');
      });
   });
  
});


