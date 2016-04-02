(function() {
    'use strict';
    angular.module('Settings')
    .controller('SettingsController', ['$state', '$ionicHistory', 'storage', '$scope', '$cordovaSocialSharing', 'load', SettingsController]);
    function SettingsController($state, $ionicHistory, storage, $scope, $cordovaSocialSharing, load) {
        var self = this;
        this.logout = function() {
            storage.remove("auth");
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $state.go('login');
        };
        this.share = function() {
            load.show();
            try {
                $cordovaSocialSharing
                    .share('Check out this awesome app called Neon, for meeting your swing partners!', 'Neon - Meet your swing partners', null, 'http://neon.com') // Share via native share sheet
                    .then(function(result) {
                        load.hide();
                    }, function(err) {
                        load.show('Error occured while sharing, plase try again', 'fail');
                });
            } catch (e) {
                console.log(JSON.stringify(e));
                load.hide();
            }
        };
        this.needHelp = function() {
            load.show();
            try {

            } catch (e) {
                load.hide();
            }
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            self.profileImage = storage.get("user").profilePicture;
        });
    }
})();
