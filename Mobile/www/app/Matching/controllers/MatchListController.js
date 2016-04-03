(function() {
    "use strict";
    angular.module('Matching')
    .controller('MatchListController', ['$scope', 'http', 'load', 'storage', 'URL', MatchListController]);
    function MatchListController($scope, http, load, storage, URL) {
        var self = this;
        this.getPhoto = URL.API;
        this.init = function() {
            load.show();
            self.matches = [];
            http.get("user/" + storage.get("user").id).then(function(res) {
                if (res)
                    if (res.data)
                        if (res.data.matches)
                            if(res.data.matches.length) {
                                angular.forEach(res.data.matches, function(id) {
                                    http.get("user/" + id).then(function(res) {
                                        if (res.data) {
                                            self.matches.push(res.data);
                                        }
                                        return;
                                    }, function(err) {
                                        return;
                                    });
                                });
                            }
                $scope.$broadcast('scroll.refreshComplete');
                load.hide();
            }, function(err) {
                $scope.$broadcast('scroll.refreshComplete');
                load.show('Something went wrong, please try again', 'fail');
            });
        };
        $scope.$on('$ionicView.beforeEnter', this.init());
    }
})();
