angular.module('Utility')
.factory('popup', ['$ionicPopup', '$timeout', '$translate', function($ionicPopup, $timeout, $translate) {
    var alertPopup = {
        createPopup: function(title, text, buttonText, buttonClass) {
            return $ionicPopup.alert({
                title: title,
                template: text,
                buttons: [{
                    text: '<b>' + buttonText + '</b>',
                    type: 'button-' + buttonClass
                }]
            });
        },
        error: function(text) {
            return this.createPopup('<i class="ion-close-circled"></i> ' + $translate.instant('error.label'), $translate.instant(text), 'OK', 'assertive');
        },
        success: function(text) {
            return this.createPopup('<i class="ion-checkmark-circled"></i> ' + $translate.instant('success.label'), $translate.instant(text), 'OK', 'positive');
        },
        warning: function(text) {
            return this.createPopup('<i class="ion-alert-circled"></i> ' + $translate.instant('warn.label'), $translate.instant(text), 'OK', 'energized');
        },
        noTranslate: function(text) {
            return this.createPopup('<i class="ion-checkmark-circled"></i> ', text, 'OK', 'energized');
        }
    };
    return alertPopup;
}]);
