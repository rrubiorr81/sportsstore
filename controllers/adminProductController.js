angular.module("sportsStoreAdmin")
    .constant("productUrl", "http://localhost:2403/products/")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("productCtrl", function ($scope, $resource, productUrl) {
        $scope.productsResource = $resource(productUrl + ":id", { id: "@id" }); //The :id part, which corresponds to the map object that is the second argument, tells AngularJS that if the data object it is working with has an id property, then it should be appended to the URL used for the Ajax request.
        $scope.listProducts = function () {
            $scope.products = $scope.productsResource.query();
        }
        //The collection of data objects returned by the query method isn’t automatically updated when objects are created or deleted, so I have to include code to take care of keeping the local collection in sync with the remote changes.
        $scope.deleteProduct = function (product) {
            product.$delete().then(function () {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        }
        $scope.createProduct = function (product) {
            new $scope.productsResource(product).$save().then(function (newProduct) {
                $scope.products.push(newProduct);
                $scope.editedProduct = null;
            });
        }
        $scope.updateProduct = function (product) {
            product.$save();
            $scope.editedProduct = null;
        }
        $scope.startEdit = function (product) {
            $scope.editedProduct = product;
        }
        $scope.cancelEdit = function () {
            $scope.editedProduct = null;
        }
        $scope.listProducts(); //starting all...
    });