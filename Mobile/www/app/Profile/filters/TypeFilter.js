(function() {
    'use strict';
    angular.module('Profile')
    .filter('EnumTypes', EnumTypes);
    function EnumTypes() {
        return function(type) {
            switch (type) {
                case 'single_men':
                    return 'Single Men <img src=\"img/ico/male.svg\" height=\"16px\" />';
                case 'single_women':
                    return 'Single Women <img src=\"img/ico/female.svg\" height=\"16px\" />';
                case 'couple':
                    return 'Couple';
                default:
                    break;
            }
        };
    }
})();
