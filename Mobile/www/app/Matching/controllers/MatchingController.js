(function() {
    'use strict';
    angular.module('Matching')
    .controller('MatchingController', ['$scope', 'http', 'load', 'storage', MatchingController]);
    function MatchingController($scope, http, load, storage) {
        var self = this;
        this.cards = [];
        this.cardDestroyed = function(idx) {
            self.cards.splice(idx, 1);
        };
        this.cardSwiped = function() {
        };
        this.likeUser = function(id) {
            alert(id);
            load.show();
            http.post('like', {liker: storage.get('user').id, likee: id}).then(function(res) {
                load.hide();
            }, function(e) {
                load.show('Something went wrong, plase try again', 'fail');
            });
        };
        this.init = function() {
            load.show('Matching');
            http.get('user').then(function(users) {
                self.cards = users.data;
                load.hide();
            }, function(e){
                load.show('Something went wrong, please try again', 'fail');
            });
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            self.init();
        });
    }
})();
