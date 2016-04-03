/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
        from: {
            type: 'string',
            required: true
        },
        to: {
            type: 'string',
            required: true
        },
        fromDeleted: {
            type: 'int',
            enum: [0, 1],
            defaultsTo: 0
        },
        toDeleted: {
            type: 'int',
            enum: [0, 1],
            defaultsTo: 0
        },
        text: {
            type: 'string',
            required: true
        },
        isNew: {
            type: 'int',
            enum: [0, 1],
            defaultsTo: 1
        },
        conversation: {
            model: 'conversation'
        },
    }
};
