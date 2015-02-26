var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){

  var User = mongoose.model('User');

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
     User.findOne({
       _id: id
     }, '-password -salt', function(err, user){
       done(err, user);
     });
  });

  require('./strategies/local.js')();

};

// passport.serialize and passport.deserialize are used to define how passport
// will handle the serialization. When a user is authenticated, passport
// will save its _id property to the session
// Later on when the user object is needed, Passport will use the
// _id property to grab the user object from the database.
