
var app = angular.module('TestApp1');

app.controller('EmployeeController', function($window, $state, $stateParams, $scope, $http, API_URL, API_DELETE, API_URL1){

    // Adds an item to the invoice's items
    $scope.addItem = function() {
        $scope.invoice.items.push({ qty:0, cost:0, description:"" });
    };

    // Remotes an item from the invoice
    $scope.removeItem = function(item) {
        $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
    };

    // Calculates the sub total of the invoice
    $scope.invoiceSubTotal = function() {
        var total = 0.00;
        angular.forEach($scope.invoice.items, function(item, key){
            total += (item.qty * item.cost);
        });
        return total;
    };

    // Calculates the tax of the invoice
    $scope.calculateTax = function() {
        return (($scope.invoice.tax * $scope.invoiceSubTotal())/100);
    };

    // Calculates the grand total of the invoice
    $scope.calculateGrandTotal = function() {
        saveInvoice();
        return $scope.calculateTax() + $scope.invoiceSubTotal();
    };

    $scope.printInfo = function() {
        window.print();
    };

});


