
'use strict';

mainApp.controller('PaymentOptionsCtrl', function ($scope, $timeout, $mdDialog, $rootScope,
    $location, $http, $mdSidenav, $log, loginService, dataService) {
    $scope.data = { key: "abcder" };

    var price = $rootScope.price;
    var productInfo = $rootScope.productInfo;
    $scope.data = {
        transactionId: "11/28/2015 2:03:36 PM",
        amount: price,
        email: "balramchavan@gmail.com",
        productInfo: productInfo,
        phone: "8237602116",
        key: "C0Dr8m",
        firstName: "balram",
        merchantId:$rootScope.merchantId
    };
    $scope.paymentDetails = "payment data from merchant";
});
