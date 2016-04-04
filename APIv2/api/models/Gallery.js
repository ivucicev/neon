/**
 * Gallery.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('uuid');
var Gallery = module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      defaultsTo: function() {
          return uuid.v4();
      }
    },
    position: {
        type: 'int',
        max: 9,
        min: 0
    },
    image: {
      type: 'string',
      required: true
    },
    user: {
      model: 'user'
    },
    toJSON: function() {
      var gallery = this.toObject();
      delete gallery.user;
      delete gallery.image;
      return gallery;
    }
  }
};
