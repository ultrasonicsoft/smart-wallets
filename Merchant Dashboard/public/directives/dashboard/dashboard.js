'use strict';

mainApp.controller('DashboardCtrl', function ($scope, $timeout, $mdDialog, $rootScope,
    $location, $http, $mdSidenav, $log, loginService, dataService) {

    var self = this;
    self.paymentGatewayServices;
    // self.paymentGatewayServices = [
    //     { name: 'PayU', wanted: true },
    //     { name: 'PayTm', wanted: false },
    //     { name: 'Netbanking', wanted: true },
    //     { name: 'Credit Card', wanted: false }
    // ];

    //TODO: fetch merchant id after login
    
    self.merchantId = $rootScope.merchantId;
    function getAllPaymentServices() {
        $http.get('/getAllPaymentServicesForMerchant/' + self.merchantId).success(function (data) {
            self.paymentGatewayServices = data[0];
            console.log(self.paymentGatewayServices);

        }).error(function () {
            alert('error');
        });
    }
    self.getAllPaymentServices = getAllPaymentServices;

    self.getAllPaymentServices();
});
