'use strict';

mainApp.controller('LoginCtrl', function ($rootScope, $scope, $location, $http, loginService, toastr) {

    $scope.login = function () {
        $rootScope.loggedInUserName = "User";
        $rootScope.isLoggingRequired = false;
        $http.post('/login', {
            username: $scope.email,
            password: $scope.password
        })
            .success(function (user) {
                // No error: authentication OK
                //myService.set(user.name);
                $rootScope.message = 'Authentication successful!';
                $rootScope.isLoggingRequired = false;
                $rootScope.loggedInUserName = $scope.email;
                loginService.set(user);
                toastr.success("You are logged in the system", 'Welcome ' + $rootScope.loggedInUserName);

                $http.get('/getMerchantId/' + user.userId).success(function (data) {
                    $rootScope.merchantId = data[0].id;
                    console.log($rootScope.merchantId);

                }).error(function () {
                    alert('error');
                });

                $location.url('/dashboard');
            })
            .error(function () {
                // Error: authentication failed
                alert("error");
                //$rootScope.message = 'Authentication failed.';
                //$location.url('/login');
            });
    }

    $scope.registerUser = function () {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'directives/register/register.html',
            controller: 'RegisterUserCtrl'
        });
    }
});