(function() {
    'use strict';
    angular.module('neonApp')
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', Config]);
    function Config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-thin-left');
    }
})();
