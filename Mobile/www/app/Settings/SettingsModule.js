(function() {
    'use strict';
    angular.module('Settings', ['jrCrop', 'dragularModule'])
    .config(['$stateProvider', '$urlRouterProvider', Settings]);
    function Settings($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html',
            controller: 'SettingsController',
            controllerAs: 'settings'
        }).state('account', {
            url: '/account',
            templateUrl: 'templates/account.html',
            controller: 'AccountController',
            controllerAs: 'account'
        });
    }
})();
