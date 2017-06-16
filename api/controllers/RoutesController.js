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

  index(req, res){
    Routes.find()
    .populateAll()
    .then(function (routes){
      let tracks;
      const promRoutes = routes.map(route => {
        tracks = route.tracks.map(track => track.id);
        return Routes.findOne({id: route.id}).populateAll();
      })
      const promTracks = Tracks.find({where: {id: tracks}}).populate('coords');
      Promise.all([promTracks, ...promRoutes]).then(function(pData){
        const tracks = pData.shift();
        const routes = pData.map((data) => {
          const result = data.toObject();
          result.tracks = data.tracks.map(dTracks => tracks.filter(coTracks => coTracks.id = dTracks.id)[0]);
          return result;
        });
        res.json(routes)
      })
    })
    .catch(function (err){
        if (err) return res.serverError(err);
    });
  }
 };
