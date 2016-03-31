angular.module('Utility')
.factory('dialog', ['$cordovaDialogs', '$translate', function ($cordovaDialogs, $translate) {
	var dialog = {
		alert: function(text, title, buttonName) {
			return $cordovaDialogs.alert($translate.instant(text), $translate.instant(title), $translate.instant(buttonName));
		},
		confirm: function(text, title, buttonsArray) {
			return $cordovaDialogs.confirm($translate.instant(text), $translate.instant(title), buttonsArray);
		},
		prompt: function(text, title, buttonsArray, defaultText) {
			return $cordovaDialogs.prompt($translate.instant(text), $translate.instant(title), buttonsArray, $translate.instant(defaultText));
		}
	};
	return dialog;
}]);
