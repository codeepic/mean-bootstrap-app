var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please fill a valid email address.']
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: 'Username is required.'
  },
  password: {
    type: String,
    validate: [
      function(password){
        return password && password.length >= 6;
      },
      'Password should be longer.'
    ]
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required!'
  },
  providerId: String,
  created: {
    type: Date,
    default: Date.now
  }
//  website: {
//    type: String,
//    get: function(url){
//      if(!url){
//        return url;
//      }else{
//        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
//          url = 'http://' + url;
//        }
//        return url;
//      }
//    }
//  }
});

UserSchema.virtual('fullName').get(function(){
   return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
   var splitName = fullName.split(' ');
   this.firstName = splitName[0] || '';
   this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next){
  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

//authenticate() instance method, which accepts a string argument, hashes it,
//and compares it to the current user's hashed password.
//something stinks in the code belo
UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};
//this instance method will allow you to call it like that:
// user.authenticate('password');

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername,
  }, function(err, user){
    if(!err){
      if(!user){
        callback(possibleUsername);
      }else{
        return this.findUniqueUsername(username, (suffix || '') + 1, callback);
      }
    }else{
      callback(null);
    }
  });
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

//UserSchema.statics.findOneByUsername = function(username, callback){
//  this.findOne({username: new RegExp(username, 'i')}, callback);
//};
//now we can use this method like:
//User.findOneByUsername('username', function(err, user){
//
//});


mongoose.model('User', UserSchema);