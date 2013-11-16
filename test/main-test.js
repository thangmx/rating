/**
 * Created by thang.mai on 11/15/13.
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    paths: {
        jquery: 'test/lib/jquery-1.10.2',
        angular: 'app/lib/angular/angular',
        angularMocks: 'test/lib/angular/angular-mocks'

    },
    shim: {
        'jquery' : {'exports' : 'jquery'},
        'angular' : { deps:['jquery'], 'exports' : 'angular'},
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        }
    },
    deps: tests,
    callback: window.__karma__.start
});