var app = angular.module("App", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/init.html"
    })
    .when("/load", {
        templateUrl : "pages/load.html"
    })
    .when("/create", {
        templateUrl : "pages/create.html"
    });
});