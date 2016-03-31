(function() {
    'use strict';
    angular.module('Profile', ['jrCrop', 'dragularModule'])
    .config(['$stateProvider', '$urlRouterProvider', Profile]);
    function Profile($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('profileEdit', {
            url: '/profile-edit',
            templateUrl: 'templates/profile-edit.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
        })
        .state('profileGallery', {
            url: '/profile-gallery',
            templateUrl: 'templates/profile-gallery.html',
            controller: 'ProfileGalleryController',
            controllerAs: 'profileGallery'
        });
    }
})();
