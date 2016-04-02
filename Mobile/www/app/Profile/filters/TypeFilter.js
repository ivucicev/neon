(function() {
    'use strict';
    angular.module('Profile')
    .filter('EnumTypes', EnumTypes);
    function EnumTypes() {
        return function(type) {
            switch (type) {
                case 'single_men':
                    return 'Single Men';
                case 'single_women':
                    return 'Single Woman';
                case 'couple':
                    return 'Couple';
                default:
                    break;
            }
        };
    }
})();
