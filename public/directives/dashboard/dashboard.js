'use strict';

mainApp.controller('DashboardCtrl', function ($scope, $timeout, $mdDialog, $rootScope,
    $location, $http, $mdSidenav, $log, loginService, dataService) {

    var self = this;

    self.loggedInUser = null;
    self.isAdmin = false;

    var postRequest = `<form id="PostForm" name="PostForm" action="https://test.payu.in/_payment" method="POST">

<input type="hidden" name="lastname" value="">
<input type="hidden" name="address2" value="">
<input type="hidden" name="udf5" value="">
<input type="hidden" name="curl" value="">
<input type="hidden" name="udf4" value="">
<input type="hidden" name="txnid" value="ffb0467973000a505ea9">
<input type="hidden" name="furlfurl" value="http://localhost:4197/ResponseHandling.aspx">
<input type="hidden" name="state" value="">
<input type="hidden" name="udf2" value="">
<input type="hidden" name="udf1" value="">
<input type="hidden" name="zipcode" value="">
<input type="hidden" name="amount" value="10">
<input type="hidden" name="email" value="amitpatel049@gmail.com">
<input type="hidden" name="city" value="">
<input type="hidden" name="country" value="">
<input type="hidden" name="udf3" value="">
<input type="hidden" name="address1" value="">
<input type="hidden" name="hash" value="b902d7b93c64511cffd07b9130e9b53c62eae04af61d2ca983844165084b4712a242d7a3bd033fca753a8a65b07ef11dcb9cae9e2bb7ffdb7fe6efffe3c41425">
<input type="hidden" name="key" value="C0Dr8m">
<input type="hidden" name="pg" value="">
<input type="hidden" name="surl" value="http://localhost:4197/ResponseHandling.aspx">
<input type="hidden" name="firstname" value="amit">
<input type="hidden" name="productinfo" value="test">
<input type="hidden" name="phone" value="7893047541">

</form>`;

    // var child = document.createElement('div');
    // child.innerHTML = postRequest;

    function buyNow() {

        var myEl = angular.element(document.querySelector('#payuForm'));
        myEl.append(postRequest);
        // var vPostForm = document.PostForm; vPostForm.submit();
        // var vPostForm = myEl.PostForm; vPostForm.submit();
        
        $location.url('/makePayment');

    }
    self.buyNow = buyNow;

});
