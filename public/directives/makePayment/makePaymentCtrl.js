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

    function makePayUPayment() {


        $http.get('/getTransactionIdAndHash').success(function (data) {

            var postRequest = `<form id="PostForm" name="PostForm" action="https://test.payu.in/_payment" method="POST">
                            <input type="hidden" name="lastname" value="">
                            <input type="hidden" name="address2" value="">
                            <input type="hidden" name="udf5" value="">
                            <input type="hidden" name="curl" value="">
                            <input type="hidden" name="udf4" value="">
                            <input type="hidden" name="txnid" value="$$txnid$$">
                            <input type="hidden" name="furlfurl" value="http://localhost:4197/ResponseHandling.aspx">
                            <input type="hidden" name="state" value="">
                            <input type="hidden" name="udf2" value="">
                            <input type="hidden" name="udf1" value="">
                            <input type="hidden" name="zipcode" value="">
                            <input type="hidden" name="amount" value="$$amount$$">
                            <input type="hidden" name="email" value="$$email$$">
                            <input type="hidden" name="city" value="">
                            <input type="hidden" name="country" value="">
                            <input type="hidden" name="udf3" value="">
                            <input type="hidden" name="address1" value="">
                            <input type="hidden" name="hash" value="$$hash$$">
                            <input type="hidden" name="key" value="$$key$$">
                            <input type="hidden" name="pg" value="">
                            <input type="hidden" name="surl" value="http://localhost:4197/ResponseHandling.aspx">
                            <input type="hidden" name="firstname" value="$$firstname$$">
                            <input type="hidden" name="productinfo" value="$$productinfo$$">
                            <input type="hidden" name="phone" value="$$phone$$">
                            </form>`;


            var transactionId = "System.Random11/28/2015 2:03:43 PM";
            var amount = 10.0;
            var email = "balramchavan@gmail.com";
            var hash = data;
            var productInfo = 'test';
            var phone = "8237602116";
            var key = "C0Dr8m";
            var firstName = "balram";

            postRequest = postRequest.replace("$$txnid$$", transactionId);
            postRequest = postRequest.replace("$$amount$$", amount.toString());
            postRequest = postRequest.replace("$$email$$", email);
            postRequest = postRequest.replace("$$productinfo$$", productInfo);
            postRequest = postRequest.replace("$$phone$$", phone);
            postRequest = postRequest.replace("$$key$$", key);
            postRequest = postRequest.replace("$$firstname$$", firstName);
            postRequest = postRequest.replace("$$hash$$", hash);

            console.log(postRequest);

            var myEl = angular.element(document.querySelector('#payuForm'));
            myEl.append(postRequest);
            var vPostForm = document.PostForm; vPostForm.submit();
        
            
        }).error(function () {
            alert('error');
        });
    }

    function makePayment($index) {
        //alert(self.allPaymentServices[$index].name);
        var selectedPaymentService = self.allPaymentServices[$index].name;
        if (selectedPaymentService === "PayU") {
            self.makePayUPayment();
        }
    }
    self.getAllPaymentServices = getAllPaymentServices;
    self.makePayUPayment = makePayUPayment;
    self.makePayment = makePayment;

    self.getAllPaymentServices();
    // self.makePayUPayment();



});
