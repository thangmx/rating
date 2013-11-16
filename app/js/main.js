/**
 * Created by Thang on 10/21/13.
 */
require.config({
   paths: {
       'angular': "lib/angular/angular",
       'angular-resource': "lib/angular/angular-resource"
   },
   shim: {
       'angular' : {'exports' : 'angular'},
       'angular-resource' : {
           deps: ['angular']
       }
   }
});

require( [
    'angular',
    'app'
    ], function(angular, app) {
        'use strict';


    angular.element(document).ready(function() {

        console.log(document);
        angular.bootstrap(document, [app['name']]);
        var html = document.getElementsByTagName('html')[0];

        html.setAttribute('ng-app', 'app');
        html.dataset.ngApp = 'app';

        if (top !== window) {
            top.postMessage({
                type: 'loadamd'
            }, '*');
        }
    });
});
