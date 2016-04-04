/**
 * MatchController
 *
 * @description :: Server-side logic for managing matches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	_user: '',
	_lookingFor: [],
	_profileType: '',
	_distance: 500,
	_usersByPage: 10,
	getMatchList: function(req, res) {
		var that = this;
		var page = parseInt(req.params.page);
		this._user = req.session.user.id;
		this._lookingFor = req.session.user.lookingFor;
		this._profileType = req.session.user.profileType;
		this._locationLat = req.session.user.locationLat;
		this._locationLng = req.session.user.locationLng;
		this._matches = req.session.user.matches;
		User.find({
			id: { '!' : that._user },
			active: "1",
			visible: "1",
			lookingFor: {
				contains: that._profileType,
			}
		},
		{
			select: ['id', 'name', 'name_opt', 'age', 'age_opt', 'sex', 'sex_opt', 'profileType', 'lookingFor', 'locationString', 'locationLng', 'locationLat']
		}).paginate({
			page: page,
			limit: that._usersByPage
		}).exec(function(err, users) {
			if (err) res.send(500, 'Error occured');
			var idx = 0;
			users.forEach(function(user) {
				console.log(user.location);
				console.log(that._lookingFor, user.profileType, that._lookingFor.indexOf(user.profileType) == -1, user.lookingFor, that._profileType, user.lookingFor.indexOf(that._profileType) == -1);
				try {
					console.log("match", that._matches, user.id, that._matches.indexOf(user.id));
					if (that._matches.indexOf(user.id) > -1) {
						users.splice(idx, 1);
						idx++;
						return;
					}
				} catch(e) {
					console.log(e);
				}
				if (that._lookingFor.indexOf(user.profileType) == -1) {
					users.splice(idx, 1);
					idx++;
					return;
				}
				if (user.lookingFor.indexOf(that._profileType) == -1) {
					users.splice(idx, 1);
					idx++;
					return;
				}
				try {
					if (user.locationLng && that._locationLng && user.locationLat && that._locationLat) {
						var dist = that._calculateDistance(user.locationLat, user.locationLng, that._locationLat, that._locationLng);
						console.log("distance is: ", dist, dist > that._distance);
						if (dist) {
							if ((dist > that._distance)) {
								users.splice(idx, 1);
								idx++;
								return;
							} else {
								users[idx].distance = Math.round(dist);
							}
						}
					}
				} catch (e) {
					// ignore;
				}
				idx++;
			});
			if (users.length) return res.json(200, users);
			return res.json(200, []);
		});
	},
	_calculateDistance: function(lat1, lon1, lat2, lon2) {
		console.log(lat1, lon1, lat2, lon2);
		var R = 6371;
		var dLat = (lat2-lat1) * (Math.PI/180);
		var dLon = (lon2-lon1) * (Math.PI/180);
		var a =
				Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos((lat1 * (Math.PI/180))) * Math.cos((lat2 * (Math.PI/180))) *
				Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		return d;
	}
};
