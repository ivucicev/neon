(function() {
    angular.module('neonApp')
    .run(function($rootScope, $cordovaNetwork, $ionicPlatform, $cordovaKeyboard) {
        $ionicPlatform.ready(function() {
            $cordovaKeyboard.hideAccessoryBar(true);
            $cordovaKeyboard.disableScroll(true);
            $ionicPlatform.onHardwareBackButton(function() {
                //this will ignore backbutton on android devices
                return;
            });
            $rootScope.networkOffline = false;
            try {
                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                    $rootScope.networkOffline = false;
                });
                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                    $rootScope.networkOffline = true;
                });
            } catch (e) {
                // return;
                //this will prevent app from crashing if Something goes wrong with cordova plugins
            }
        });
    });
})();
