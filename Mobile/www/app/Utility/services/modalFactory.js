angular.module('Utility')
.factory('modal', function($ionicModal) {
    var mods;
    var modalW = {
        reveal: function(template, animation, data) {
            animate = 'animated ' + animation;
            if (typeof animation == 'undefined' || animation == false || animation === null) {
                animate = 'slide-in-up';
            }
            mod = $ionicModal.fromTemplateUrl('templates/_modals/' + template, {
                    scope: data,
                    animation: animate
            }).then(function(modal) {

                mods = modal;
                modal.show();
            });
            return mods;
        },
        destroy: function() {

            mods.hide();
            mods.remove();
        }
    };
    return modalW;
});
