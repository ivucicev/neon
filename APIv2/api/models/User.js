/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');

var User = module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      defaultsTo: function() {
        return uuid.v4();
      }
    },
    email: {
      type: 'email',
      unique: true,
      required: true,
      regex: /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/
    },
    username: {
      type: 'string',
      unique: true,
      required: true,
      maxLength: 16,
      minLength: 6,
      regex:  /^[a-zA-Z]+[a-zA-Z0-9_]{6,16}$/
    },
    password: {
      type: 'string',
      required: true,
      minLength: 4,
      regex: /^[a-zA-Z0-9!@#$%^&*]{4,}$/
    },
    profileType: {
      type: 'string',
      enum: ['single_men', 'single_women', 'couple']
    },
    lookingFor: {
      type: 'array',
    },
    about: {
      type: 'string'
    },
    facebookId: {
      type: 'string'
    },
    name: {
      type: 'string',
      maxLength: 25
    },
    age: {
      type: 'int',
      max: 119,
      min: 18
    },
    sex: {
        type: 'string',
        enum: ['male', 'female']
    },
    sex_opt: {
        type: 'string',
        enum: ['male', 'female']
    },
    name_opt: {
      type: 'string',
      maxLength: 25
    },
    age_opt: {
      type: 'int',
      max: 119,
      min: 18
    },
    profilePicture: {
      type: 'string'
    },
    loggedIn: {
      type: 'int',
      enum: [0, 1],
      defaultsTo: 0
    },
    active: {
      type: 'int',
      enum: [0, 1],
      defaultsTo: 0
    },
    confirmed: {
      type: 'int',
      enum: [0, 1],
      defaultsTo:  0
    },
    location: {
      model: 'location'
    },
    visible: {
        type: 'int',
        enum: [0, 1],
        defaultsTo: 1
    },
    push: {
        type: 'int',
        enum: [0, 1],
        defaultsTo: 1
    },
    gallery: {
      collection: 'gallery',
      via: 'user'
    },
    toJSON: function() {
      var user = this.toObject();
      delete user.password;
      delete user.gallery;
      return user;
    },
    validPassword: function(password, callback) {
      var obj = this.toObject();
      if (callback) {
        return bcrypt.compare(password, obj.password, callback);
      }
      return bcrypt.compareSync(password, obj.password);
    }
    },
      beforeCreate: function(values, next) {
        bcrypt.hash(values.password, null, null, function(err, hash) {
          if (err) return next(err);
          values.password = hash;
          next();
        });
      },
      beforeUpdate: function(values, next) {
        if (values.password) {
          bcrypt.hash(values.password, null, null, function(err, hash) {
            if (err) return next(err);
            values.password = hash;
            next();
          });
        } else {
          next();
        }
    }
};
