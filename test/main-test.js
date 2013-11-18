/**
 * Created by thang.mai on 11/15/13.
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        window.__karma__.files[file.replace(/^\//, '')] = window.__karma__.files[file];
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    baseUrl: 'base/app/js',
    paths: {
        jquery: '../../test/lib/jquery-1.10.2',
        angular: 'lib/angular/angular',
        'angularMocks': '../../test/lib/angular/angular-mocks',
        'angular-resource': 'lib/angular/angular-resource'

    },
    shim: {
        'angular' : { deps:['jquery'], 'exports' : 'angular'},
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angular-resource' : {
            deps:['angular']
        }
    },
    deps: tests,
    callback: window.__karma__.start
});