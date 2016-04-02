(function() {
    "use strict";
    angular.module('Matching')
    .controller('MatchController', ['$scope', 'http', 'load', 'storage', MatchController]);
    function MatchController() {
        //ignore for now
        console.log("Its a match");
    }
})();
