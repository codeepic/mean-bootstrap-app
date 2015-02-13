var User = require('mongoose').model('User');

exports.create = function(req, res, next){
  var user = new User(req.body);
  console.log('user is ', user);
  user.save(function(err){
     if(err){
       return next(err);
     }else{
       res.json(user);
     }
  });
};
