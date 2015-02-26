module.exports = {
  //development configuration options
  db: 'mongodb://localhost/mean',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: '1054264157923447',
    clientSecret: '428f464a86ac4707fe6886719dda53d9',
    callbackURL: 'http://localhost:4000/oauth/facebook/callback'
  }
};

//the callbackURL property will be passed to Facebook OAuth service,
//which will redirect to that URL after the authentication process is over