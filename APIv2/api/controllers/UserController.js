/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getProfilePicture: function(req, res) {
        User.findOne({id: req.params.id}).exec(function(err, user) {
            if (err) return res.send(404, 'Not found');
            var ext = '';
            if (user.profilePicture.indexOf('png')) {
                ext = 'png';
            } else if (user.profilePicture.indexOf('jpeg')) {
                ext = 'jpeg';
            } else if (user.profilePicture.indexOf('jpg')) {
                ext = 'jpg';
            } else if (user.profilePicture.indexOf('gif')) {
                ext = 'gif';
            }
            var img = new Buffer(user.profilePicture.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,''), 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/' + ext,
                'Content-Length': img.length
            });
            res.end(img);
        });
    }
};
