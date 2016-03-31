/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Location = module.exports = {
  attributes: {
    locationId: {
      type: 'string'
    },
    locationLat: {
      type: 'string',
    },
    locationLng: {
      type: 'string',
    },
    locationString: {
      type: 'string'
    },
    user: {
      model: 'user',
      unique: true
    }
  }
};
