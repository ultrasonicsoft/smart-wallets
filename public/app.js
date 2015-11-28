'use strict';
// Declare app level module which depends on views, and components
var mainApp = angular.module('myApp',
    [
        'ngRoute',
        'ngAnimate',
        'ngMaterial',
        'toastr',
        'ui.bootstrap',
        'ui.grid',
        'ui.grid.resizeColumns',
        'ui.grid.selection',
        'ui.grid.pinning',
        'ui.grid.autoResize',
        'ui.grid.selection',
        'ui.grid.exporter',
        'ui.grid.grouping',
        'ngFileUpload',
        'xeditable'
    ])
    .controller('WebShopCtrl',
        function ($rootScope, $scope, $mdSidenav, $log, $modal) {
            $rootScope.isLoggingRequired = true;

        });

mainApp.config(function ($routeProvider, $locationProvider, $httpProvider, toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-center',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        timeOut: 2000,
        target: 'body'
    });
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        // Initialize a new promise
        var deferred = $q.defer();
        
        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin').success(function (user) {
            // Authenticated
            if (user !== '0')
                /*$timeout(deferred.resolve, 0);*/
                deferred.resolve();

            // Not Authenticated
            else {
                $rootScope.message = 'You need to log in.';
                //$timeout(function(){deferred.reject();}, 0);
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };
    
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            response: function (response) {
                // do something on success
                return response;
            },
            responseError: function (response) {
                if (response.status === 401)
                    $location.url('/login');
                return $q.reject(response);
            }
        };
    });

    $routeProvider
        .when('/', {
            templateUrl: 'directives/carousel/carousel.html',
            controller: 'CarouselCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'directives/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        }).when('/paymentOptions', {
            templateUrl: 'directives/paymentOptions/paymentOptions.html',
            controller: 'PaymentOptionsCtrl'
        }).when('/smartPayments', {
            templateUrl: 'directives/smartPayments/smartPayments.html',
            controller: 'SmartPaymentsCtrl'
        }).when('/paymentResult', {
            templateUrl: 'directives/paymentResult/paymentResult.html',
            controller: 'PaymentResultCtrl'
        })
        .when('/logout', {
            templateUrl: 'directives/carousel/carousel.html',
            controller: 'LogoutCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    //================================================
}).run(function ($rootScope, $http, $location) {
    $rootScope.message = '';
    //editableOptions.theme = 'bs2';
    $rootScope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    
    // Logout function is available in any pages
    $rootScope.logout = function () {
        $rootScope.message = 'Logged out.';
        $http.post('/logout');
    };
});

mainApp.directive('login', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/login/login.html',
        controller: 'LoginCtrl'
    };
});

mainApp.directive('carouselImages', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/carousel/carousel.html',
        controller: 'CarouselCtrl'
    };
});

mainApp.directive('smartPayments', function () {
    return {
        restrict: 'EA',
        scope: { data: '=' },
        templateUrl: 'directives/smartPayments/smartPayments.html',
        controller: 'SmartPaymentsCtrl'
    };
});

mainApp.directive('paymentOptions', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/paymentOptions/paymentOptions.html',
        controller: 'PaymentOptionsCtrl'
    };
});

mainApp.directive('paymentResult', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/paymentResult/paymentResult.html',
        controller: 'paymentResultCtrl'
    };
});
