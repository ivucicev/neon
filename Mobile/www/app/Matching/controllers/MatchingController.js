(function() {
    'use strict';
    angular.module('Matching')
    .controller('MatchingController', ['$scope', 'http', 'load', 'storage', 'URL', MatchingController]);
    function MatchingController($scope, http, load, storage, URL) {
        var self = this;
        this.getPhoto = URL.API;
        this.cards = [];
        this.page = 0;
        this.cardDestroyed = function(idx) {
            self.cards.splice(idx, 1);
        };
        this.cardSwiped = function() {
        };
        this.likeUser = function(id) {
            load.show();
            http.post('like', {liker: storage.get('user').id, likee: id}).then(function(res) {
                load.hide();
            }, function(e) {
                load.show('Something went wrong, plase try again', 'fail');
            });
        };
        this.init = function() {
            load.show('Matching');
            http.get('match-list/' + self.page).then(function(users) {
                if (users.data.length && users.data[0]) {
                    self.cards = users.data;
                    self.page++;
                } else {
                    self.page = 0;
                }
                load.hide();
            }, function(e){
                self.page = 0;
                load.show('Something went wrong, please try again', 'fail');
            });
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            self.init();
        });
    }
})();
