(function() {
    'use strict';
    angular.module('Login')
        .controller('RegisterController', ['http', 'load', '$state', 'modal', RegisterController]);
    function RegisterController(http, load, $state, modal) {
        var that = this;
        this.validatingEmail = false;
        this.validatingUsername = false;
        this.emailTaken = false;
        this.usernameTaken = false;
        this.readTerms = function() {
            modal.reveal('_termsModal.html');
        };
        this.closeTerms = function() {
            modal.destroy();
        };
        this.validateEmail = function() {
            that.validatingEmail = true;
            http.get('email-available/' + that.registerData.email).then(function(res) {
                if (res.data.status == 1 && res.status == 200) {
                    if (parseInt(res.data.count) >= 1) {
                        that.emailTaken = true;
                    } else that.emailTaken = false;
                }
                that.validatingEmail = false;
            }, function(e){
                that.validatingEmail = false;
            });
        };
        this.validateUsername = function() {
            that.validatingUsername = true;
            http.get('username-available/' + that.registerData.username).then(function(res) {
                if (res.data.status == 1 && res.status == 200) {
                    if (parseInt(res.data.count) >= 1) {
                        that.usernameTaken = true;
                    } else that.usernameTaken = false;
                }
                that.validatingUsername = false;
            }, function(e){
                that.validatingUsername = false;
            });
        };
        this.register = function() {
            load.show();
            if (that.registerData.repeatPassword !== that.registerData.password) {
                load.show('Passwords do not match', 'fail');
                return;
            }
            delete that.registerData.repeatPassword;
            http.post('user', that.registerData).then(function(res){
                load.show('Registration was successful', 'success');
                that.registerData = {};
                $state.go('login');
            }, function(e) {
                console.log(e);
                load.show('Something went wrong while registering, please try again. ' + e.data.details, 'fail');
            });
        };
    }
})();
