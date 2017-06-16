/**
 * Tracks.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    noOfHouses: {
      type: 'integer',
    },

    type: {
      enum: ['left', 'right', 'total']
    },

    coords: {
      collection: 'coords',
      via: 'track'
    },

    route: {
      model: 'routes',
    }
  },

  add(attrs, next) {
		return this.create({
			noOfHouses: attrs.noOfHouses,
			type: String(attrs.type).trim(),
		}).exec(next);
	},

};
