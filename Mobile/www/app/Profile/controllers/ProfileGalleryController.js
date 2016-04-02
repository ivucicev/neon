(function() {
    'use strict';
    angular.module('Profile')
    .controller('ProfileGalleryController', ['$scope', 'camera', '$ionicActionSheet', 'load', '$jrCrop', 'dragularService', 'http', 'storage', '$timeout', ProfileGalleryController]);
    function ProfileGalleryController($scope, camera, $ionicActionSheet, load, $jrCrop, dragularService, http, storage, $timeout) {
        var self = this;
        this.reordered = false;
        dragularService(angular.element(document.getElementById("container")), { scope: $scope });
        $scope.$on('dragulardragend', function() {
            $timeout(function() {
                self.reordered = true;
            });
            self.reorder();
        });
        this.show = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<b><span class="positive">Take new photo</span></b>' },
                    { text: 'Choose photo from gallery' }
                ],
                titleText: 'Gallery picture',
                cancelText: '<span class="assertive">Cancel</span>',
                cancel: function() {
                    hideSheet();
                },
                buttonClicked: function(index) {
                    hideSheet();
                    self.photo(index);
                }
            });
        };
        this.showDelete = function(id) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<span class="assertive">Yes</span>' },
                    { text: 'No' }
                ],
                titleText: 'Delete picture?',
                cancel: function() {
                    hideSheet();
                },
                buttonClicked: function(index) {
                    if (index) {
                        hideSheet();
                        return;
                    } else {
                        hideSheet();
                        self.removeImage(id);
                    }
                }
            });
        };
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
                width: 300,
                height: 300
            }).then(function(canvas) {
                self.gallery.push({image: canvas.toDataURL()});
                self.uploadGalleryImage(canvas.toDataURL());
            }, false);
        };
        this.uploadGalleryImage = function(image) {
            load.show();
            http.post('gallery', {image: image, user: storage.get("user").id}).then(function(res) {
                if (res.data.id) {
                    self.gallery[self.gallery.length - 1].id = res.data.id;
                    storage.save("gallery", self.gallery);
                    load.hide();
                } else {
                    self.gallery.pop();
                    load.show("Something went wrong please try again", 'fail');
                }
            }, function() {
                self.gallery.pop();
                load.show("Something went wrong please try again", 'fail');
            });
        };
        this.removeImage = function(id) {
            load.show();
            http.delete('gallery/' + id).then(function(res) {
                var idx = 0;
                angular.forEach(self.gallery, function(gal) {
                    if (gal.id === id) {
                        self.gallery.splice(idx, 1);
                        storage.save("gallery", self.gallery);
                    }
                    idx++;
                });
                load.hide();
            }, function(e) {
                load.show("Something went wrong, please try again", 'fail');
            });
        };
        this.getGallery = function() {
            load.show();
            http.get('user/' + storage.get('user').id + '/gallery').then(function(res) {
                if (res.data.length) {
                    storage.save("gallery", res.data);
                    self.gallery = res.data;
                } else {
                    storage.remove("gallery");
                }
                load.hide();
            }, function(e) {
                load.hide();
            });
        };
        this.init = function() {
            // problem here, gallery if there is gallery in local storage...
            self.gallery = storage.get("gallery") || [];
            if (!self.gallery.length) self.getGallery();
            angular.forEach(document.getElementsByClassName('oneItem'), function(elm) {
                elm.style.height = elm.offsetWidth - 10 + 'px';
                elm.style.padding = '3px';
                self.itemHeight = elm.offsetWidth - 10 + 'px';
            });
        };
        this.reorder = function() {
            var idx = 0;
            var userId = storage.get("user").id;
            angular.forEach(document.getElementsByClassName("tracking"), function(e) {
                self.gallery[idx] = {
                    id: e.getAttribute('data-id'),
                    image: e.childNodes[1].getAttribute('src'),
                    user: userId
                };
                idx++;
            });
        };
        this.saveOrder = function() {
            load.show();
            var idx = 0;
            angular.forEach(self.gallery, function(e) {
                http.post('gallery/' + e.id, {position: idx});
                idx++;
            });
            $timeout(function() {
                load.hide();
                storage.save("gallery", self.gallery);
                self.reordered = false;
            }, 1500);
        };
        $scope.$on('$ionicView.enter', function() {
            self.init();
        });
    }
})();
