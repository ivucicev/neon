/**
 * Conversation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid = require('uuid');
var Conversation = module.exports = {
    attributes: {
        id: {
          type: 'string',
          primaryKey: true,
          unique: true,
          defaultsTo: function() {
            return uuid.v4();
          }
        },
        active: {
            type: 'int',
            enum: [0, 1],
            defaultsTo: 0
        },
        users: {
            type: 'array',
            required: true
        },
        latestMessage: {
            type: 'string',
            defaultsTo: null
        },
        latestMessageFrom: {
            type: 'string',
            required: true
        },
        isLatestMessageNew: {
            type: 'int',
            enum: [0, 1],
            defaultsTo: 1
        },
        messages: {
            collection: 'message',
            via: 'conversation'
        },
        toJSON: function() {
          var conversations = this.toObject();
          delete conversations.messages;
          return conversations;
        }
    }
 };
