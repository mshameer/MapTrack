/**
 * RoutesController
 *
 * @description :: Server-side logic for managing routes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	create(req, res) {
 		const params = req.allParams();
 		Routes.create(params, (err, route) => {
 			if (err) {
 				return res.negotiate(err);
 			}

 	  	const promises  = params.tracks.map(function(trackId) {
 	   		return Tracks.update({ route: route.id },{ track: trackId });
 	  	});

 			Promise.all(promises).then(function(records) {
 	      res.json(records);
 	    })
 	    .catch(function(err) {
 	      return res.negotiate(err);
 	    })

 		});
 	},
 };
