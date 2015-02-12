//adding a nre controller to the sportStore module...
angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")  //this constant is appended to the module (fluent API)
    .constant("productListPageCount", 3)                //the number of products shown on a page
    .controller("productListCtrl", function ($scope, $filter,  productListActiveClass, productListPageCount, cart) {
        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        //newCategory is the string category, passed on click...
        $scope.selectCategory = function (productCategory) {
            selectedCategory = productCategory; //productCategory ==> string
            $scope.selectedPage = 1;
            //console.log('selecting category');
        }
        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }
        $scope.categoryFilterFn = function (product) {
            //console.log(product);
            return selectedCategory == null ||
            product.category == selectedCategory;
        }
        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }
        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }

        //his pattern of declaring a dependency on a service and then selectively exposing its functionality through the scope is one you will encounter a lot in AngularJS development.
        $scope.addProductToCart = function (product) {
            cart.addProduct(product.id, product.name, product.price);
        }
    });

//apparently when the user clicks on a category and the selectCategory method is called; we set the local variable
//[selectedCategory]. Then the filter -somehow- reruns on the model -somehow modified- and lets only the products
//belonging to the selected category...

//The question i have is "how the filter knows it must be rerun, when only an internal variable changed [selectedCategory]...?"

//R --
//Apparently Angular does some dirty checks.. very time something happens it triggers the filters , to maintain the 2 way binding.
//this is the reason this works... since [categoryFilterFn] is applied as a filter...