(function() {
    'use strict';
    angular.module('Utility')
        .factory('location', ['$cordovaGeolocation', '$http', function ($cordovaGeolocation, $http) {
            var options = {
                timeout: 10000,
                enableHighAccuracy: true,
                maximumAge: 5000
            };
            return {
                get: function () {
                    return $cordovaGeolocation.getCurrentPosition(options)
                        .finally(function (data) {});
                },
                silent: function () {
                    return $cordovaGeolocation.getCurrentPosition(options)
                        .finally(function () {});
                },
                reverseGeocode: function (lat, lon) {
                    return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&result_type=administrative_area_level_1&key=AIzaSyBM5BRdc7KUCIJEpwmPOlTg0nRlhbx8cug');
                },
                geocode: function (address) {
                    return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address));
                },
                getClosest: function(lat, lon, type) {
                    return $http({method: 'JSONP', url:'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=5000&types=' + type + '&name=' + type + '&key=AIzaSyBM5BRdc7KUCIJEpwmPOlTg0nRlhbx8cug'});
                }
            };
    }]);
})();
