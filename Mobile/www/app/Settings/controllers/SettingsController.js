(function() {
    'use strict';
    angular.module('Settings')
    .controller('SettingsController', ['$state', '$ionicHistory', 'storage', SettingsController]);
    function SettingsController($state, $ionicHistory, storage) {
        this.logout = function() {
            storage.remove("auth");
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $state.go('login');
        };
    }
})();
