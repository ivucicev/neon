angular.module('Home')
.controller('HomeController', ['$scope', 'storage', HomeController]);
function HomeController($scope, storage) {
    var self = this;
    this.otherUsers = false;
    this.users = [];
    this.currentUser = [];
    this.init = function() {
        self.users = storage.get("users") || [];
        self.currentUser = storage.get("currentUser") || [];
    };
    this.showOtherUsers = function() {
        self.otherUsers = !self.otherUsers;
    };
    this.selectUser = function(user) {
        storage.save("currentUser", user);
        self.currentUser = user;
        self.otherUsers = false;
    };
    $scope.$on('$ionicView.beforeEnter', function() {
        self.init();
    });
}
