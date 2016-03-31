angular.module('Utility')
.factory('log', function (DEBUG) {
    var log = {
        log: function(data) {
            if (DEBUG) {
                if (typeof data == 'string' || typeof data == 'number') {
                    console.log(data);
                } else if (typeof data == 'object') {
                    console.log(JSON.stringify(data));
                } else if (data == 'undefined' || typeof data == 'undefined') {
                    console.log("Data is not defined");
                } else {
                    console.log("Data is null");
                }
            } else return;
        },
        error: function(data) {
            if (DEBUG) {
                if (typeof data == 'string' || typeof data == 'number') {
                    console.log(data);
                } else if (typeof data == 'object') {
                    console.log(JSON.stringify(data));
                } else if (data == 'undefined' || typeof data == 'undefined') {
                    console.log("Data is not defined");
                } else {
                    console.log("Data is null");
                }
            } else return;
        }
    };
    return log;
});
