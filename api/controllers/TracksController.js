/* global  */
/**
 * TracksController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var Promise = require('bluebird');

module.exports = {
	create(req, res) {
		const params = req.allParams();

		Tracks.add(params, (err, map) => {
			if (err) {
				return res.negotiate(err);
			}

	  	const promises  = params.path.map(function(coord) {
	   		return Coords.create({latitude: coord.lat, longitude: coord.lng, track: map.id })
	  	});

			Promise.all(promises).then(function(records) {
	      res.json(map);
	    })
	    .catch(function(err) {
	      return res.negotiate(err);
	    })

		});
	},
};
