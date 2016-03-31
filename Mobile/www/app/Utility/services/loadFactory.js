(function() {
    'use strict';
    angular.module('Utility')
    .factory('load', ['$ionicLoading', '$rootScope', 'util', '$timeout', 'storage', function ($ionicLoading, $rootScope, util, $timeout, storage) {
        var loader = {
            show: function (title, type) {
                $rootScope.text = title || '';
                $rootScope.type = type || false;
                if (this._isVisible()) {
                   return;
                } else {
                    $ionicLoading.show({
                       template:    '<ion-spinner style="stroke: #FF3771;" ng-hide="type" icon="spiral"></ion-spinner>' +
                                    '<i class="icon ion-checkmark-circled animated fadeInUp" style="font-size: 50px; color: #FF3771" ng-show="type == &apos;success&apos;"></i>' +
                                    '<i class="icon ion-close-circled animated fadeInUp" style="font-size: 50px; color: #D54937" ng-show="type == &apos;fail&apos;"></i>' +
                                    '<p class="animated fadeInUp" style="color: white" ng-show="text"><br>{{text}}</p>' +
                                    '<button class="button button-clear animated fadeInUp" style="color: #FF3771; font-weight: bold" ng-show="type" ng-controller="UtilityController as util" ng-click="util.closeLoader()"><strong>OK</strong></button>',
                       content: 'Loading',
                       animation: 'fadeIn'
                   });
                }
            },
            nav: function () {
                $rootScope.loader = true;
            },
            hide: function () {
                $rootScope.loader = false;
                $rootScope.text = '';
                $ionicLoading.hide();
                storage.save("loader", 0);
            },
            _isVisible: function() {
                var l = storage.get("loader");
                if (l === 'undefined' || typeof l === 'undefined') {
                    storage.save("loader", 0);
                    return 0;
                } else {
                    return l;
                }
            }
        };
        return loader;
    }]);
})();
