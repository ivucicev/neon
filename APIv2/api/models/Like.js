/**
 * Like.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Like = module.exports = {
  attributes: {
      liker: {
          type: 'string',
          required: true
      },
      likee: {
          type: 'string',
          required: true
      }
  }
};
