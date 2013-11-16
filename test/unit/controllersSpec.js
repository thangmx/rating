'use strict';

/* jasmine specs for controllers go here */
define(['angular', 'angularMocks', 'app'], function(angular, mocks, app){
'use strict';
describe('RatingApp controllers', function () {
    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('ratingApp'));
    beforeEach(module('ratingServices'));

    describe('RatingAppCtrl', function () {

        var scope, dscope, ctrl, dctrl, $httpBackend, $rootScope, $controller;

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', 'rates/rates.json').respond({
                "1": {
                    "id": 1,
                    "value": 0
                },
                "2": {
                    "id": 2,
                    "value": 0
                },
                "3": {
                    "id": 3,
                    "value": 0
                },
                "4": {
                    "id": 4,
                    "value": 0
                },
                "5": {
                    "id": 5,
                    "value": 0
                }
            });

            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            scope = $rootScope.$new();
            ctrl = $controller('RatingAppCtrl', {
                $scope: scope
            });
        }));

        it('should create "rates" model with ratings fetched from xhr', function () {
            expect(scope.rates).toEqual([]);

            $httpBackend.flush();
            expect(scope.rates).toEqualData([{
                id: 1,
                value: 0
            }, {
                id: 2,
                value: 0
            }, {
                id: 3,
                value: 0
            }, {
                id: 4,
                value: 0
            }, {
                id: 5,
                value: 0
            }]);
        });

        it('should add a rating', function () {
            $httpBackend.flush();
            expect(scope.rates).toEqualData([{
                id: 1,
                value: 0
            }, {
                id: 2,
                value: 0
            }, {
                id: 3,
                value: 0
            }, {
                id: 4,
                value: 0
            }, {
                id: 5,
                value: 0
            }]);

            $httpBackend.expectPOST('rates/rates.json', {
                "id": -1,
                "value": 0
            }).respond(200, {
                    "id": 6,
                    "value": 0
                });
            $httpBackend.expectGET('rates/rates.json').respond({
                "1": {
                    "id": 1,
                    "value": 0
                },
                "2": {
                    "id": 2,
                    "value": 0
                },
                "3": {
                    "id": 3,
                    "value": 0
                },
                "4": {
                    "id": 4,
                    "value": 0
                },
                "5": {
                    "id": 5,
                    "value": 0
                },
                "6": {
                    "id": 6,
                    "value": 0
                }
            });

            scope.addRate();

            $httpBackend.flush();
            expect(scope.rates).toEqualData([{
                id: 1,
                value: 0
            }, {
                id: 2,
                value: 0
            }, {
                id: 3,
                value: 0
            }, {
                id: 4,
                value: 0
            }, {
                id: 5,
                value: 0
            }, {
                id: 6,
                value: 0
            }]);
        });

        it('should delete a rating', function () {
            $httpBackend.flush();
            expect(scope.rates).toEqualData([{
                id: 1,
                value: 0
            }, {
                id: 2,
                value: 0
            }, {
                id: 3,
                value: 0
            }, {
                id: 4,
                value: 0
            }, {
                id: 5,
                value: 0
            }]);

            $httpBackend.expectDELETE('rates/rates.json?id=3').respond({
                "id": 3,
                "value": 0
            });
            $httpBackend.expectGET('rates/rates.json').respond({
                "1": {
                    "id": 1,
                    "value": 0
                },
                "2": {
                    "id": 2,
                    "value": 0
                },
                "4": {
                    "id": 4,
                    "value": 0
                },
                "5": {
                    "id": 5,
                    "value": 0
                },
                "6": {
                    "id": 6,
                    "value": 0
                }
            });

            scope.deleteRate(3);

            $httpBackend.flush();
            expect(scope.rates).toEqualData([{
                id: 1,
                value: 0
            }, {
                id: 2,
                value: 0
            }, {
                id: 4,
                value: 0
            }, {
                id: 5,
                value: 0
            }, {
                id: 6,
                value: 0
            }]);
        });

        it('should update a rating', function () {
            $httpBackend.flush();
            expect(scope.rates).toEqualData([{
                id: 1,
                value: 0
            }, {
                id: 2,
                value: 0
            }, {
                id: 3,
                value: 0
            }, {
                id: 4,
                value: 0
            }, {
                id: 5,
                value: 0
            }]);

            $httpBackend.expectPOST('rates/rates.json', {
                "id": 3,
                "value": 7
            }).respond(200, {
                    "id": 3,
                    "value": 7
                });
            $httpBackend.expectGET('rates/rates.json').respond({
                "1": {
                    "id": 1,
                    "value": 0
                },
                "2": {
                    "id": 2,
                    "value": 0
                },
                "3": {
                    "id": 3,
                    "value": 7
                },
                "4": {
                    "id": 4,
                    "value": 0
                },
                "5": {
                    "id": 5,
                    "value": 0
                }
            });

            scope.updateRate(3, 7);

            $httpBackend.flush();
            expect(scope.rates).toEqualData([{
                id: 1,
                value: 0
            }, {
                id: 2,
                value: 0
            }, {
                id: 3,
                value: 7
            }, {
                id: 4,
                value: 0
            }, {
                id: 5,
                value: 0
            }]);
        });


    });

    describe('rating', function () {
        var elm, scope, $compile;
        var maxRating = 3;


        beforeEach(inject(function ($injector) {
            scope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
            elm = angular.element('<rating id="1" value="value" max="' + maxRating + '"> </rating>');
        }));

        it('should have correct number of stars', function () {
            $compile(elm)(scope);
            scope.$digest();
            for (var i = 0; i < maxRating; i++) {
                scope.$apply(function () {
                    //scope.rate = { id : 1, value : 4 };
                    scope.value = i;
                });
                var star = elm.find('i[class~="icon-star"]');
                expect(star.length).toBe(i);
            }
        });
    });

    describe('RatingController', function () {
        var scope, ctrl, $rootScope, $controller, attrs;
        var foo, bar = null;

        beforeEach(inject(function ($injector) {

            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            scope = $rootScope.$new();
            attrs = {
                readonly: false,
                max: 10,
                stateOff: null,
                stateOn: null
            };
            ctrl = $controller('RatingController', {
                $scope: scope,
                $attrs: attrs
            });

            scope.id = "3";
            scope.value = 4;
            scope.readonly = false;
        }));

        it('should pass id as number to updateRate function', function () {
            $rootScope.updateRate = function (id, value) {};
            spyOn($rootScope, 'updateRate');
            scope.rate(7);
            expect($rootScope.updateRate).toHaveBeenCalledWith(3, 7);
        });

        it('should pass id as number to updateRate function', function () {
            var typeOfId;
            $rootScope.updateRate = function (id, value) {
                typeOfId = typeof (id);
            };
            scope.rate(7);
            expect(typeOfId).toBe('number');
        });
    });
});
});