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
    function updateSubscription(selectedPaymentOption) {

        var data = {
            merchantId: $rootScope.merchantId,
            paymentServiceId: selectedPaymentOption.id,
            value: selectedPaymentOption.subscribed
        };

        $http.post('/updateMerchantSubscription', { paymentData: data }).success(function (data) {
            console.log(data);
        });
        
    }

    self.getAllPaymentServices = getAllPaymentServices;
    self.updateSubscription = updateSubscription;
    self.getAllPaymentServices();
});
