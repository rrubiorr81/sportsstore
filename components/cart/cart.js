angular.module("cart", [])
    //since one service object is used throughout the application, the factory function will be called only once.
    .factory("cart", function () {
        var cartData = [];
        return {        //returning the object. cartData is initialized in [] but in sucesives calls it will be filled...
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    } }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1, id: id, price: price, name: name
                    }); }
            },
            removeProduct: function (id) {
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id == id) {
                    cartData.splice(i, 1);
                    break;
                } }
        },
            getProducts: function () {
                return cartData;
            } }
})
    /*Directives are created by calling the directive method on an AngularJS module and passing in the name of the directive (cartSummary in this case) and a factory function that returns a directive definition object*/
    .directive("cartSummary", function (cart) {
        return {
            restrict: "E",                                      //this directive can be applied only as an element
            templateUrl: "components/cart/cartSummary.html",    //Specifies the URL of a partial view whose contents will be inserted into the directive’s element.
            controller: function ($scope) {                     //Specifies a controller that will provide data and behaviors to the partial view.
                var cartData = cart.getProducts();
                $scope.total = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].count);
                    }
                    return total;
                }
                $scope.itemCount = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }
                    return total;
                }
            } };
    });