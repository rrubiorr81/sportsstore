angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:2403/users/login")
    .constant("ordersUrl", "http://localhost:2403/orders")
    .controller("authCtrl", function($scope, $http, $location, authUrl) {
        $scope.authenticate = function (user, pass) {
            $http.post(authUrl, {
                username: user,
                password: pass
            }, {
                withCredentials: true   //I have supplied an optional configuration object to the $http.post method, which sets the withCredentials option to true. This enables support for cross-origin requests, which allows Ajax requests to work with cookies that deal with authentication. Without this option enabled, the browser will ignore the cookie that Deployd returns as part of the authentication response and expects to see in subsequent requests.
            }).success(function (data) {
                $location.path("/main");
            }).error(function (error) {
                $scope.authenticationError = error;
            }); }
    })
    .controller("mainCtrl", function($scope) {
        $scope.screens = ["Products", "Orders"];
        $scope.current = $scope.screens[0];
        $scope.setScreen = function (index) {
            $scope.current = $scope.screens[index];
        };
        $scope.getScreen = function () {
            return $scope.current == "Products"
                ? "/views/adminProducts.html" : "/views/adminOrders.html";
        }; })
    .controller("ordersCtrl", function ($scope, $http, ordersUrl) {
        $http.get(ordersUrl, {withCredentials : true}) //This ensures that the browser includes the security cookie back to Deployd to authenticate the request.
            .success(function (data) {
                $scope.orders = data;
            })
            .error(function (error) {
                $scope.error = error;
            });
        $scope.selectedOrder;
        $scope.selectOrder = function(order) {
            $scope.selectedOrder = order;
        };
        $scope.calcTotal = function(order) {
            var total = 0;
            for (var i = 0; i < order.products.length; i++) {
                total += order.products[i].count * order.products[i].price;
            }
            return total;
        }
    });
