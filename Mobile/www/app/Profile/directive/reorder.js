(function() {
    angular.module('Profile').directive(
    'sortable', ['$ionicGesture', '$ionicScrollDelegate',
    function ($ionicGesture, $ionicScrollDelegate) {
      return {
        restrict: 'A',
        scope: {
          draggable: '@',
          sorted: '&'
        },
        link: function (scope, element, attrs) {

          var settings = {
            draggable: scope.draggable ? scope.draggable : '.card'
          };

          var dragging, cardSet, initialIndex, currentIndex, offsetY;

          var touchHold = function touchHold(e) {
            // Get the element we're about to start dragging
            dragging = angular.element(e.target).closest(settings.draggable);
            if (!dragging.length) dragging = null;

            if (dragging) {

              // ... code goes here ...
            }
          };
          var holdGesture = $ionicGesture.on('hold', touchHold, element);

          var touchMove = function touchMove(e) {
            if (dragging) {
              // Prevent list scrolling
              e.stopPropagation();

              // ... code goes here ...
            }
          };

          // Handle both mouse and touch gestures
          var touchGesture = $ionicGesture.on('touchmove', touchMove, element);
          var mouseGesture = $ionicGesture.on('mousemove', touchMove, element);

          var touchRelease = function touchRelease(e) {
            if (dragging) {
              dragging = null;

              // ... code goes here ...
            }
          };
          var releaseGesture = $ionicGesture.on('release', touchRelease, element);

          // Detatch all events when destroying directive
          scope.$on('$destroy', function () {
            $ionicGesture.off(holdGesture, 'hold', touchHold);
            $ionicGesture.off(touchGesture, 'touchmove', touchMove);
            $ionicGesture.off(mouseGesture, 'mousemove', touchMove);
            $ionicGesture.off(releaseGesture, 'release', touchRelease);
          });
        }
      };
    }]);
})();
