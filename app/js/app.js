/**
 * Created by thang.mai on 11/15/13.
 */
define([
    'angular',
    'services',
    'directives',
    'controllers'
    ], function (angular) {
        'use strict';

        return angular.module('ratingApp', [
            'ratingApp.services',
            'ratingApp.controllers',
            'ratingApp.directives'
        ]);
});