'use strict';

mainApp.controller('MakePaymentCtrl', function ($scope, $timeout, $mdDialog, $rootScope,
    $location, $http, $mdSidenav, $log, loginService, dataService) {
    
    var self = this;
    self.allPaymentServices;
    
    function getAllPaymentServices() {
        $http.get('/getAllPaymentServices').success(function (data) {
            self.allPaymentServices = data[0];
            console.log(self.allPaymentServices);

        }).error(function () {
            alert('error');
        });
    }
    self.getAllPaymentServices = getAllPaymentServices;
    
    self.getAllPaymentServices();
    
    
});
