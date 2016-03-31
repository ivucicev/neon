(function() {
    'use strict';
    angular.module('Login', []);
    angular.module('Login').config(LoginConfig);
    function LoginConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterController',
            controllerAs: 'register'
        })
        .state('forgotPassword', {
            url: '/forgot-password',
            templateUrl: 'templates/passwordReset.html',
            controller: 'ForgotPasswordController',
            controllerAs: 'forgot'
        });
        if (window.localStorage.getItem("auth") !== 1) {
            $urlRouterProvider.otherwise('/login');
        } else {
            var user = window.localStorage.getItem("user");
            if (user.active) {
                $urlRouterProvider.otherwise('/matching');
            } else {
                $urlRouterProvider.otherwise('/profile');
            }
        }
    }
})();
