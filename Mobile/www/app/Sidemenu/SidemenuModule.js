angular.module('Sidemenu', [])
.config(['$stateProvider', '$urlRouterProvider', Home]);
function Home($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('sidemenu', {
        url: '/sidemenu',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'SidemenuController',
        controllerAs: 'side'
    });
}
