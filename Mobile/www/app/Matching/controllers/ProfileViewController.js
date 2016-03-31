(function() {
    'use strict';
    angular.module('Matching')
    .controller('ProfileViewController', ['$scope', '$state', 'http', '$ionicSlideBoxDelegate', '$timeout', 'load', '$ionicHistory', ProfileViewController]);
    function ProfileViewController($scope, $state, http, $ionicSlideBoxDelegate, $timeout, load, $ionicHistory) {
        var self = this;
        this.slider = false;
        this.gallery = {};
        this.user = {};
        this.triggerError = function() {
            load.show('Something went wrong', 'fail');
            $ionicHistory.goBack();
        };
        this.init = function() {
            load.show();
            http.get('user/' + $state.params.id).then(function(user) {
                self.user = user.data;
                http.get('user/' + $state.params.id + '/gallery').then(function(gallery) {
                    self.gallery = gallery.data;
                    $timeout(function () {
                        load.hide();
                        $ionicSlideBoxDelegate.update();
                        self.slider = true;
                    }, 500);
                }, function(e) {
                    self.triggerError();
                });
            }, function(e) {
                self.triggerError();
            });
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            self.init();
        });
    }
})();
