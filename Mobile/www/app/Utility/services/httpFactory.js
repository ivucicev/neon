(function() {
    angular.module('Utility')
    .factory('http', ['$http', 'URL', 'storage', function ($http, URL, storage) {
        return {
            _setHeaders: function() {
                return  {'Authorization': 'Basic ' + storage.get("auth"),
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'};
            },
            get: function(link) {
                var that = this;
                return $http({
                    url: URL.API + link,
                    headers: that._setHeaders(),
                    method: "GET",
                });
            },
            post: function(link, data) {
                var that = this;
                return $http({
                    url: URL.API + link,
                    headers: that._setHeaders(),
                    method: "POST",
                    data: data
                });
            },
            delete: function(link) {
                var that = this;
                return $http({
                    url: URL.API + link,
                    headers: that._setHeaders(),
                    method: "DELETE"
                });
            }
        };
    }]);
})();
