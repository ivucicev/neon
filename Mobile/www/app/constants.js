(function() {
    'use strict';
    var dev = 'http://192.168.5.103:1337/';
    var aws = 'http://52.28.69.109:1337/';
    var local = 'http://localhost:1337/';
    angular.module('neonApp')
    .constant('DEBUG', true)
    .constant('URL', {
        'API': local
    });
})();
