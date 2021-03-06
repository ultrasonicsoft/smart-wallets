'use strict';
// Declare app level module which depends on views, and components
var mainApp = angular.module('bcusSmartPayments',
    [
        'ngRoute',
        'ngAnimate',
        'ngMaterial',
        'ui.bootstrap'
    ])
    .controller('AppCtrl',
        function () {
        });

mainApp.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            template: '<div class="container"> ' +
            '<div ng-controller="SmartPaymentsCtrl as ctrl" ng-cloak> ' +
            '   <div layout="row">' +
            '      <div class="col-md-2">' +
            '         <span class="text">Payment amount: {{ctrl.paymentDetails.amount}}</span>' +
            '    </div>' +
            ' </div>' +
            '<div class="row">' +
            '   <div class="col-md-2">' +
            '      <span class="text">Product Info: {{ctrl.paymentDetails.productInfo}}</span>' +
            ' </div>' +
            '        </div>' +
            '       <md-list ng-cloak>' +
            '          <md-subheader class="md-no-sticky">Choose Payment Service to pay</md-subheader>' +
            '         <md-list-item ng-repeat="paymentService in ctrl.allPaymentServices">' +
            '            <md-button class="md-raised md-primary" ng-click="ctrl.makePayment($index)">{{ paymentService.name }}</md-button>' +
            '       </md-list-item>' +
            '      <md-divider></md-divider>' +
            ' </md-list>' +
            '<div id="payuForm"></div>' +
            '    </div>' +
            '</div>',
            controller: 'SmartPaymentsCtrl'
        })
        .when('/smartPayments', {
            // templateUrl: 'directives/smartPayments/smartPayments.html',
            template: '<div class="container"> ' +
            '<div ng-controller="SmartPaymentsCtrl as ctrl" ng-cloak> ' +
            '   <div layout="row">' +
            '      <div class="col-md-2">' +
            '         <span class="text">Payment amount: {{ctrl.paymentDetails.amount}}</span>' +
            '    </div>' +
            ' </div>' +
            '<div class="row">' +
            '   <div class="col-md-2">' +
            '      <span class="text">Product Info: {{ctrl.paymentDetails.productInfo}}</span>' +
            ' </div>' +
            '        </div>' +
            '       <md-list ng-cloak>' +
            '          <md-subheader class="md-no-sticky">Choose Payment Service to pay</md-subheader>' +
            '         <md-list-item ng-repeat="paymentService in ctrl.allPaymentServices">' +
            '            <md-button class="md-raised md-primary" ng-click="ctrl.makePayment($index)">{{ paymentService.name }}</md-button>' +
            '       </md-list-item>' +
            '      <md-divider></md-divider>' +
            ' </md-list>' +
            '<div id="payuForm"></div>' +
            '    </div>' +
            '</div>',
            controller: 'SmartPaymentsCtrl'
        });
});

mainApp.directive('smartPayments', function () {
    return {
        restrict: 'EA',
        scope: { data: '=' },
        template: '<div class="container"> ' +
            '<div ng-controller="SmartPaymentsCtrl as ctrl" ng-cloak> ' +
            '   <div layout="row">' +
            '      <div class="col-md-2">' +
            '         <span class="text">Payment amount: {{ctrl.paymentDetails.amount}}</span>' +
            '    </div>' +
            ' </div>' +
            '<div class="row">' +
            '   <div class="col-md-2">' +
            '      <span class="text">Product Info: {{ctrl.paymentDetails.productInfo}}</span>' +
            ' </div>' +
            '        </div>' +
            '       <md-list ng-cloak>' +
            '          <md-subheader class="md-no-sticky">Choose Payment Service to pay</md-subheader>' +
            '         <md-list-item ng-repeat="paymentService in ctrl.allPaymentServices">' +
            '            <md-button class="md-raised md-primary" ng-click="ctrl.makePayment($index)">{{ paymentService.name }}</md-button>' +
            '       </md-list-item>' +
            '      <md-divider></md-divider>' +
            ' </md-list>' +
            '<div id="payuForm"></div>' +
            '    </div>' +
            '</div>',
        controller: 'SmartPaymentsCtrl'
    };
});