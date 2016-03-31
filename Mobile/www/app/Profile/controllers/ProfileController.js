(function() {
    'use strict';
    angular.module('Profile')
    .controller('ProfileController', ['$ionicActionSheet', 'camera', 'load', '$jrCrop', 'location', 'http', 'storage', '$scope', '$ionicHistory', '$state', ProfileController]);
    function ProfileController($ionicActionSheet, camera, load, $jrCrop, location, http, storage, $scope, $ionicHistory, $state) {
        var self = this;
        this.image = false;
        this.photo = function(index) {
            load.show();
            try {
                camera.takePhoto(index).then(function(res) {
                    self.crop(res);
                }, function() {
                    load.hide();
                });
            } catch (e) {
                var image = camera.takePhoto(index);
                self.crop(image);
            }
        };
        this.crop = function(image) {
            load.hide();
            $jrCrop.crop({
                url: 'data:image/jpg;base64,' + image,
                width: 500,
                height: 500
            }).then(function(canvas) {
                self.image = canvas.toDataURL();
            }, function() {
            });
        };
        this.searchAddress = function() {
            load.show('Getting your current location');
            location.get().then(function(res) {
                self.latitude = res.coords.latitude;
                self.longitude = res.coords.longitude;
                location.reverseGeocode(self.latitude, self.longitude).then(function(res) {
                    self.profileData.locationTemp = res.data.results[0].formatted_address;
                    self.placeId = res.data.results[0].place_id;
                    load.hide();
                }, function() {
                    load.show('Could not find your current address', 'fail');
                });
            }, function(err) {
                console.log(JSON.stringify(err));
                load.show('Please check your location services', 'fail');
            });
        };
        this.show = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Take new photo</b>' },
                    { text: 'Choose photo from gallery' }
                ],
                titleText: 'Profile picture',
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                buttonClicked: function(index) {
                    hideSheet();
                    self.photo(index);
                }
            });
        };
        this.saveProfile = function() {
            load.show();
            self.profileData.profilePicture = self.image;
            var loc = self.profileData.locationTemp;
            self.profileData.location = {
                locationLat: self.latitude,
                locationLng: self.longitude,
                locationString: loc,
                locationId: self.placeId
            };
            self.profileData.active = 1;
            self.profileData.loggedIn = 1;
            delete self.profileData.locationTemp;
            http.post('user/' + storage.get('user').id, self.profileData).then(function(res) {
                storage.save('user', res.data);
                load.hide();
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go('matching');
            }, function(e) {
                load.show('Something went wrong, please try again', 'fail');
            });
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            var user = storage.get("user");
            user.age = parseInt(user.age);
            user.age_opt = parseInt(user.age_opt);
            self.image = user.profilePicture;
            self.profileData = user || {};
            self.profileData.locationTemp = user.location.locationString;
        });
    }
})();
