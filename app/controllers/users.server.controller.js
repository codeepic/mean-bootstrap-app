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

exports.list = function(re, res, next){
  User.find({}, function(err, users){
    if(err){
      return next(err);
    }else{
      res.json(users);
    }
  });
};

//retrieve only username and email if you use:
//User.find({}, 'username email', function(err, users){

exports.read = function(req, res){
  res.json(req.user);
};

exports.userByID = function(req, res, next, id){
  User.findOne({_id: id}, function(err, user){
    if(err){
      return next(err);
    }else{
      console.log('id ', id);
      console.log('user ', user);
      //res.user = user; orig
      res.json(user);
      next();
    }
  });
};