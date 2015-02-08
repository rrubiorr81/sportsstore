//adding a nre controller to the sportStore module...
angular.module("sportsStore")
    .controller("productListCtrl", function ($scope, $filter) {
        var selectedCategory = null;
        //newCategory is the whole product order, passed on click...
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
        }
        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
            product.category == selectedCategory;
        } });

//apparently when the user clicks on a category and the selectCategory method is called; we set the local variable
//[selectedCategory]. Then the filter -somehow- reruns on the model -somehow modified- and lets only the products
//belonging to the selected category...

//The question i have is "how the filter knows it must be rerun, when only an internal variable changed [selectedCategory]...?"