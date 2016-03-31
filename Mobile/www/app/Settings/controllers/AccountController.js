(function() {
    'use strict';
    angular.module('Settings')
    .controller('AccountController', ['$scope', 'storage', 'load', 'http', '$ionicHistory', AccountController]);
    function AccountController($scope, storage, load, http, $ionicHistory) {
        var self = this;
        this.saveAccount = function() {
            if (self.accountData.password) {
                if (self.accountData.password !==  atob(storage.get("auth")).split(':')[1]) {
                    load.show('You entered wrong password', 'fail');
                    return;
                } else {
                    if (self.accountData.newPassword && self.accountData.repeatPassword === self.accountData.newPassword) {
                        //allow pass change
                        self.saveOnline(true);
                    } else {
                        load.show('New password does not match with repeated password', 'fail');
                        return;
                    }
                }
            } else self.saveOnline(false);
        };
        this.saveOnline = function(passChanged) {
            load.show();
            var data = {};
            if (passChanged) data.password = self.accountData.newPassword;
            data.visible = self.accountData.visibility ? 1 : 0;
            data.push = self.accountData.push ? 1 : 0;
            console.log(storage.get('user'));
            http.post('user/' + storage.get('user').id, data).then(function(res) {
                if (passChanged) storage.save("auth", btoa(storage.get("user").username + ':' + self.accountData.newPassword));
                storage.save("user", res.data);
                load.hide();
                $ionicHistory.goBack();
            }, function(e) {
                load.show('Something went wrong, please try again', 'fail');
            });
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            var user = storage.get("user");
            console.log(user);
            self.accountData = {};
            self.accountData.email = user.email;
            self.accountData.username = user.username;
            try {
                self.accountData.push = user.push == parseInt(1) ? true : false;
                self.accountData.visibility = user.visible == parseInt(1) ? true : false;
            } catch (e) {
                self.accountData.push = true;
                self.accountData.visibility = true;
            }
        });
    }
})();
