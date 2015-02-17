exports.render = function(req, res){
  res.render('index', {
    title: 'Hello',
    userFullName: req.user ? req.user.fullName : ''
  });
};




//exports.render = function(req, res){
//
//  if(req.session.lastVisit){
//    console.log("last visit: ", req.session.lastVisit);
//  }
//
//  req.session.lastVisit = new Date();
//
//  res.render('index', {title: "I am coming from controller"});
//};