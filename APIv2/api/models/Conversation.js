/**
 * Conversation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid = require('uuid');
 module.exports = {
    attributes: {
        id: {
          type: 'string',
          primaryKey: true,
          unique: true,
          defaultsTo: function() {
            return uuid.v4();
          }
        },
        users: {
            type: 'array',
            required: true
        },
        newMessage: {
            type: 'string',
            defaultsTo: null
        },
        messages: {
            collection: 'message',
            via: 'conversation'
        },
    }
 };
