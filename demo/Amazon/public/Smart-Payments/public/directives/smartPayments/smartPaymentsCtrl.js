'use strict';

mainApp.controller('SmartPaymentsCtrl', function ($scope, $timeout, $mdDialog, $rootScope,
    $location, $http, $log ) {

    var self = this;
    
    self.paymentDetails = $scope.data;
    
    self.allPaymentServices;

    function getAllPaymentServices() {
        $http.get('/getAllPaymentServices/' + self.paymentDetails.merchantId).success(function (data) {
            self.allPaymentServices = data[0];
            console.log(self.allPaymentServices);

        }).error(function () {
            alert('error');
        });
    }

    function makePayUPayment() {
        var randomTransactionId = Math.random();
        var paymentData = {
            transactionId: randomTransactionId,
            amount: "10.0",
            email: "balramchavan@gmail.com",
            productInfo: 'test',
            phone: "8237602116",
            key: "C0Dr8m",
            firstName: "balram"
        };

        $http.post('/postDataToGetHash', { paymentData: paymentData }).success(function (data) {
                        var postRequest = `<form id="PostForm" name="PostForm" action="https://test.payu.in/_payment" method="POST">
                            <input type="hidden" name="lastname" value="">
                            <input type="hidden" name="address2" value="">
                            <input type="hidden" name="udf5" value="">
                            <input type="hidden" name="curl" value="">
                            <input type="hidden" name="udf4" value="">
                            <input type="hidden" name="txnid" value="$$txnid$$">
                            <input type="hidden" name="furlfurl" value="http://localhost:3000/#/paymentResult">
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
                            <input type="hidden" name="surl" value="http://localhost:3000/#/paymentResult">
                            <input type="hidden" name="firstname" value="$$firstname$$">
                            <input type="hidden" name="productinfo" value="$$productinfo$$">
                            <input type="hidden" name="phone" value="$$phone$$">
                            </form>`;


            // var transactionId = "11/28/2015 2:03:36 PM";
            // var amount = 10.0;
            // var email = "balramchavan@gmail.com";
            // var hash = data;
            // var productInfo = 'test';
            // var phone = "8237602116";
            // var key = "C0Dr8m";
            // var firstName = "balram";

            postRequest = postRequest.replace("$$txnid$$", paymentData.transactionId);
            postRequest = postRequest.replace("$$amount$$", paymentData.amount.toString());
            postRequest = postRequest.replace("$$email$$", paymentData.email);
            postRequest = postRequest.replace("$$productinfo$$", paymentData.productInfo);
            postRequest = postRequest.replace("$$phone$$", paymentData.phone);
            postRequest = postRequest.replace("$$key$$", paymentData.key);
            postRequest = postRequest.replace("$$firstname$$", paymentData.firstName);
            postRequest = postRequest.replace("$$hash$$", data);

            console.log(postRequest);

            var myEl = angular.element(document.querySelector('#payuForm'));
            myEl.append(postRequest);
            var vPostForm = document.PostForm; vPostForm.submit();
        });

//         $http.get('/getTransactionIdAndHash').success(function (data) {
// 
//             var postRequest = `<form id="PostForm" name="PostForm" action="https://test.payu.in/_payment" method="POST">
//                             <input type="hidden" name="lastname" value="">
//                             <input type="hidden" name="address2" value="">
//                             <input type="hidden" name="udf5" value="">
//                             <input type="hidden" name="curl" value="">
//                             <input type="hidden" name="udf4" value="">
//                             <input type="hidden" name="txnid" value="$$txnid$$">
//                             <input type="hidden" name="furlfurl" value="http://localhost:4197/ResponseHandling.aspx">
//                             <input type="hidden" name="state" value="">
//                             <input type="hidden" name="udf2" value="">
//                             <input type="hidden" name="udf1" value="">
//                             <input type="hidden" name="zipcode" value="">
//                             <input type="hidden" name="amount" value="$$amount$$">
//                             <input type="hidden" name="email" value="$$email$$">
//                             <input type="hidden" name="city" value="">
//                             <input type="hidden" name="country" value="">
//                             <input type="hidden" name="udf3" value="">
//                             <input type="hidden" name="address1" value="">
//                             <input type="hidden" name="hash" value="$$hash$$">
//                             <input type="hidden" name="key" value="$$key$$">
//                             <input type="hidden" name="pg" value="">
//                             <input type="hidden" name="surl" value="http://localhost:4197/ResponseHandling.aspx">
//                             <input type="hidden" name="firstname" value="$$firstname$$">
//                             <input type="hidden" name="productinfo" value="$$productinfo$$">
//                             <input type="hidden" name="phone" value="$$phone$$">
//                             </form>`;
// 
// 
//             var transactionId = "11/28/2015 2:03:36 PM";
//             var amount = 10.0;
//             var email = "balramchavan@gmail.com";
//             var hash = data;
//             var productInfo = 'test';
//             var phone = "8237602116";
//             var key = "C0Dr8m";
//             var firstName = "balram";
// 
//             postRequest = postRequest.replace("$$txnid$$", transactionId);
//             postRequest = postRequest.replace("$$amount$$", amount.toString());
//             postRequest = postRequest.replace("$$email$$", email);
//             postRequest = postRequest.replace("$$productinfo$$", productInfo);
//             postRequest = postRequest.replace("$$phone$$", phone);
//             postRequest = postRequest.replace("$$key$$", key);
//             postRequest = postRequest.replace("$$firstname$$", firstName);
//             postRequest = postRequest.replace("$$hash$$", hash);
// 
//             console.log(postRequest);
// 
//             var myEl = angular.element(document.querySelector('#payuForm'));
//             myEl.append(postRequest);
//             var vPostForm = document.PostForm; vPostForm.submit();

// 
//         }).error(function () {
//             alert('error');
//         });
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
