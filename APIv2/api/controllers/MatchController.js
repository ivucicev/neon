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
	_ageMin: 15,
	_ageMax: 25,
	getNewMatches: function(req, res) {
		User.findOne({id: req.session.user.id}).exec(function(err, user) {
			if (err) return res.send(500, "Error occured");
			return res.json(200, user.newMatches);
		});
	},
	getMatchList: function(req, res) {
		var that = this;
		var page = parseInt(req.params.page);
		this._user = req.session.user.id;
		this._lookingFor = req.session.user.lookingFor;
		this._profileType = req.session.user.profileType;
		this._locationLat = req.session.user.locationLat;
		this._locationLng = req.session.user.locationLng;
		this._matches = req.session.user.matches;
		try {
			that._distance = req.session.user.locationRange ? req.session.user.locationRange : 500;
		} catch (e) {
			// ignore for now
		}

		var queryBuild = [];

		switch (this._lookingFor) {
			case 'single_men':
				queryBuild.push({ profileType: 'single_men' });
				break;
			case 'single_women':
				queryBuild.push({ profileType: 'single_women' });
				break;
			case 'couple':
				queryBuild.push({ profileType: 'couple' });
				break;
			default:
				queryBuild.push({ profileType: 'single_men' });
				queryBuild.push({ profileType: 'single_women' });
				queryBuild.push({ profileType: 'couple' });
		}

		User.find({
			id: { '!' : that._user },
			active: "1",
			visible: "1"
		},
		{
			select: ['id', 'name', 'name_opt', 'age', 'age_opt', 'sex', 'sex_opt', 'profileType', 'lookingFor', 'locationString', 'locationLng', 'locationLat', 'isProfilePictureFacebook', 'facebookId']
		})
		.where({
			or: queryBuild
		})
		.paginate({
			page: page,
			limit: that._usersByPage
		}).exec(function(err, users) {
			if (err) res.send(500, 'Error occured');
			var idx = 0;
			var tempUsers = [];
			var hasPages = 0;
			users.forEach(function(user) {
				console.log(" CURRENT STEP ", idx);
				console.log(" *** BEGIN MATCH *** ");
				console.log(" *** USER MATCHING (CURRENT) *** ", that._user, that._profileType, that._lookingFor);
				console.log(" *** USER TRYING TO MATCH *** ", user.id, user.profileType, user.lookingFor, user.name);
				try {
					if (that._matches) {
						if (that._matches.length) {
							if (that._matches.indexOf(user.id) > -1) {
								console.log(" *** MATCH USERS ARE ALREADY MATCHED *** ");
								idx++;
								return;
							}
						}
					}
				} catch(e) {
					console.log(" *** MATCH EXCEPTION WHILE MATCHIG *** ");
					console.log(e);
				}
				if (!(that._lookingFor == 'all' && user.lookingFor == 'all')) {
					if (that._lookingFor != 'all') {
						if (that._lookingFor != user.profileType) {
							console.log(" *** USER PROFILE TYPE 1" + user.profileType + " IS NOT INSIDE USER INTEREST *** ");
							idx++;
							return;
						}
					}
					if (user.lookingFor != 'all') {
						if (user.lookingFor != (that._profileType)) {
							console.log(" *** USER PROFILE TYPE 2" + that._profileType + " IS NOT INSIDE USER INTEREST *** ");
							idx++;
							return;
						}
					}
				}
				try {
					if (user.locationLng && that._locationLng && user.locationLat && that._locationLat) {
						var dist = that._calculateDistance(parseFloat(user.locationLat), parseFloat(user.locationLng), parseFloat(that._locationLat), parseFloat(that._locationLng));
						console.log("distance is: ", dist, dist > that._distance);
						if (dist) {
							if ((dist > that._distance) && that._distance < 500) {
								idx++;
								return;
							} else {
								user.distance = Math.round(dist);
							}
						}
					}
				} catch (e) {
					// ignore;
				}
				tempUsers.push(user);
				console.log(" *** USER VALID FOR MATCHING *** ");
				console.log(" *** *** *** *** *** *** *** *** ");
				idx++;
			});
			User.find({
				id: { '!' : that._user },
				active: "1",
				visible: "1"
			},{
				select: ['id']
			}).paginate({
				page: page + 1,
				limit: that._usersByPage
			}).exec(function(err, usersCount) {
				if (err) {
					if (tempUsers.length) return res.json(200, {matches: tempUsers, hasPages: hasPages});
					return res.json(200, []);
				}
				if (usersCount.length > 0) hasPages = 1;
				if (tempUsers.length) return res.json(200, {matches: tempUsers, hasPages: hasPages});
				return res.json(200, {matches: [], hasPages: hasPages});
			});
		});
	},
	_calculateDistance: function(lat1, lon1, lat2, lon2) {
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
