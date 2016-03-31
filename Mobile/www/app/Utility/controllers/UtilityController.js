angular.module('Utility')
.controller('UtilityController', ['load', UtilityController]);

function UtilityController(load) {
    this.closeLoader = function() {
        load.hide();
    };
}
