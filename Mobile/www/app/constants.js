(function() {
    'use strict';
    var dev = 'http://192.168.5.103:1337/';
    angular.module('neonApp')
    .constant('DEBUG', true)
    .constant('URL', {
        'API': dev
    });
})();
