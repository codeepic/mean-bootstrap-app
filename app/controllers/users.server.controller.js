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

//MIDDLEWARE FN
exports.userByID = function(req, res, next, id){
  User.findOne({_id: id}, function(err, user){
    if(err){
      return next(err);
    }else{
      req.user = user;
      next();
    }
  });
};

exports.read = function(req, res){
  res.json(req.user);
};

exports.update = function(req, res, next) {
  //console.log("updating id : ", req.params.userId);
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
  //User.findByIdAndUpdate(req.params.userId, req.body, function(err, user) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

exports.delete = function(req, res, next){
  req.user.remove(function(err){
     if(err){
       next(err);
     }else{
       res.json(req.user);
     }
  });
};