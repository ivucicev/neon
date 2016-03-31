(function() {
    'use strict';
    angular
    .module('Login')
    .controller('LoginController', ['storage', 'util', '$state', 'modal', '$scope', 'load', '$timeout', 'http', '$ionicHistory', LoginController]);
    function LoginController(storage, util, $state, modal, $scope, load, $timeout, http, $ionicHistory) {
        var self = this;
        this.login = function() {
            load.show();
            storage.save("auth", btoa(self.loginData.username + ':' + self.loginData.password));
            http.post('login', self.loginData, true).then(function(res) {
                if (res.status === 200 && res.data.status == 1) {
                    load.hide();
                    storage.save("user", res.data.user);
                    $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableBack: true
                    });
                    if (res.data.user.active == 1) {
                        $state.go('matching');
                    } else {
                        $state.go('profileEdit');
                    }
                } else {
                    storage.remove("auth");
                    load.show('Invalid username/password combination', 'fail');
                }
            }, function(e) {
                storage.remove("auth");
                load.show('Invalid username/password combination', 'fail');
            });
        };
    }
})();
