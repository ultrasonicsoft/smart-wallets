'use strict';
// Declare app level module which depends on views, and components
var mainApp = angular.module('bcusSmartPayments',
    [
        'ngRoute',
        'ngAnimate',
        'ngMaterial',
        'ui.bootstrap'
    ])
    .controller('SmartPaymentsCtrl',
        function () {
        });

mainApp.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'directives/smartPayments/smartPayments.html',
            controller: 'SmartPaymentsCtrl'
        })
        .when('/smartPayments', {
            templateUrl: 'directives/smartPayments/smartPayments.html',
            controller: 'SmartPaymentsCtrl'
        });
});

mainApp.directive('smartPayments', function () {
    return {
        restrict: 'EA',
        scope: { data: '=' },
        templateUrl: 'directives/smartPayments/smartPayments.html',
        controller: 'SmartPaymentsCtrl'
    };
});