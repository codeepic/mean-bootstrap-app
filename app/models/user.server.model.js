var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate: [
      function(password){
        return password.length >= 6;
      },
      'Password should be longer.'
    ]
  },
  created: {
    type: Date,
    default: Date.now
  },
  website: {
    type: String,
//    set: function(url){
//      if(!url){
//        return url;
//      }else{
//        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
//          url = 'http://' + url;
//        }
//        return url;
//      }
//    },
    get: function(url){
      if(!url){
        return url;
      }else{
        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
          url = 'http://' + url;
        }
        return url;
      }
    }
  }
});

UserSchema.virtual('fullName').get(function(){
   return this.firstName + ' ' + this.lastName;
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.statics.findOneByUsername = function(username, callback){
  this.findOne({username: new RegExp(username, 'i')}, callback);
};
//now we can use this method like:
//User.findOneByUsername('username', function(err, user){
//
//});

UserSchema.methods.authenticate = function(password){
  return this.password === password
};
//this instance method will allow you to call it like that:
// user.authenticate('password');

mongoose.model('User', UserSchema);