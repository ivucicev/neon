angular.module('Home', [])
.config(['$stateProvider', '$urlRouterProvider', Home]);
function Home($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('sidemenu.home', {
        url: '/home',
        views: {
          'menuContent': {
              templateUrl: 'templates/home.html',
              controller: 'HomeController',
              controllerAs: 'home'
          }
        }
    });
}
