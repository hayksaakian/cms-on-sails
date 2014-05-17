/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt')

module.exports = {

  attributes: {

    name : { type: 'string', required: true },

    email : { type: 'string', email: true, required: true, unique: true },

    encryptedPassword : { type: 'string' },

    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  },
  beforeCreate: function (values, next) {
    if(!values.password || values.password != values.confirmation){
      return next({err: ["Password doesnt match password confirmation"]})
    }

    bcrypt.hash(values.password, 10, function (err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    })
  },
  beforeUpdate: function(values, next) {
    // console.log('inside beforeUpdate')
    if(values.newPassword && values.newPassword != values.confirmation){
      // console.log('inside password comparison')
      return next({err: ["Password doesnt match password confirmation"]})
    }
    // console.log(values)

    bcrypt.compare(values.password, values.encryptedPassword, function(err, valid) {
      // console.log('inside bcrypt.compare')
      if (err) return next(err);
      // console.log('good bcrypt.compare')
      
      // If the password from the form doesn't match the password from the database...
      if (!valid) {
        // console.log('incorrect password')
        return next();
      }

      // console.log('about to enter bcrypt.hash')

      bcrypt.hash(values.newPassword, 10, function (err, encryptedPassword) {
        // console.log('inside bcrypt.hash')
        if (err) return next(err);
        // console.log('all systems go!')
        values.encryptedPassword = encryptedPassword;
        next();
      })   
    })
  }
};

