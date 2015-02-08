//adding a nre controller to the sportStore module...
angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")  //this constant is appended to the module (fluent API)
    .controller("productListCtrl", function ($scope, i, productListActiveClass) {
        var selectedCategory = null;
        //newCategory is the string category, passed on click...
        $scope.selectCategory = function (productCategory) {
            selectedCategory = productCategory; //productCategory ==> string
            //console.log('selecting category');
        }
        $scope.categoryFilterFn = function (product) {
            //console.log(product);
            return selectedCategory == null ||
            product.category == selectedCategory;
        }
        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }
    });

//apparently when the user clicks on a category and the selectCategory method is called; we set the local variable
//[selectedCategory]. Then the filter -somehow- reruns on the model -somehow modified- and lets only the products
//belonging to the selected category...

//The question i have is "how the filter knows it must be rerun, when only an internal variable changed [selectedCategory]...?"

//R --
//Apparently Angular does some dirty checks.. very time something happens it triggers the filters , to maintain the 2 way binding.
//this is the reason this works... since [categoryFilterFn] is applied as a filter...