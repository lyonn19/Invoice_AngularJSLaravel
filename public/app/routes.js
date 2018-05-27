var app = angular.module('TestApp',['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/ventas");
    $stateProvider
        .state('home', {
            url: "/ventas",
            templateUrl: "templates/ventas.html",
            controller: ''
        })

        .state('home1', {
            url: "/create",
            templateUrl: "templates/create.html",
            controller: ''
        })
});



app.constant('API_URL1', 'http://localhost:82/angularb/public/api/v1/cargos');
app.constant('API_URL', 'http://localhost:82/angularb/public/api/v1/employees');
app.constant('API_UL', 'http://localhost:82/angularb/public/api/v1/uploadImg');
app.constant('API_DELETE', 'http://localhost:82/angularb/public/api/v1/employees/');


