(function() {
    "use strict";
    angular.module('Matching', ['ionic.contrib.ui.tinderCards'])
    .config(['$stateProvider', '$urlRouterProvider', Matching]);
    function Matching($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('matching', {
            url: '/matching',
            templateUrl: 'templates/matching.html',
            controller: 'MatchingController',
            controllerAs: 'matching'
        })
        .state('matchingUserProfile', {
            url: '/matching-user-profile/:id/:fromList',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileViewController',
            controllerAs: 'profileview'
        })
        .state('matchList', {
            url: '/matching-list',
            templateUrl: 'templates/matchList.html',
            controller: 'MatchListController',
            controllerAs: 'list'
        });
    }
})();
