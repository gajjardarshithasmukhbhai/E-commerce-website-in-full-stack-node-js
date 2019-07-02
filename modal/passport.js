var GoogleStrategy = require('passport-google-oauth20');
var GitHubStrategy = require('passport-github');
var InstagramStrategy = require('passport-instagram');
var FacebookStrategy = require('passport-facebook');
var passport=require('passport');
passport.use(new GoogleStrategy({
    clientID: "696016007441-gtdnqjpl3auit24qf2859efaks3t1lk2.apps.googleusercontent.com",
    clientSecret: "XqHHv9dFyJc18qPZvkY3tZFO",
    callbackURL: "https://xemzom.herokuapp.com/gajjurock",
    // scope:['user:email'],
  },
  (accessToken, refreshToken, profile, cb)=>{
  	  exports.emailID=profile._json.email;
  	  console.log(profile);		
      return cb(null, profile);
  }
));

passport.use(new GitHubStrategy({
    clientID: "0bd1e43f983e6c6c2ac7",
    clientSecret: "63b41b791e926001b53ffeb6b09c66b84370c22b",
    callbackURL: "https://xemzom-chatting.herokuapp.com/gajjurocks",
    scope:['user:email'],
  },
  (accessToken, refreshToken, profile, ck)=>{
    // User.findOrCreate({ googleId: profile.id },(err, user)=> {
    //   console.log('Gajjar DArshit',user);
    // });
  	  exports.emailID=profile.emails[0].value;
  	  console.log(profile.emails[0].value);
      console.log(profile);
      return ck(null, profile);
  }
));
passport.use(new InstagramStrategy({
    clientID: "00d7b8a48dd540bca6210cdd38631b0f",
    clientSecret: "6f24e4e6a2d4463291f0d4f0e6c33bcf",
    callbackURL: "https://xemzom-chatting.herokuapp.com/instagram",
    // scope:['email'],
  },
  (accessToken, refreshToken, profile, ck)=>{
    exports.emailID=profile.provider;
    // console.log('hello',profile.provider);
      return ck(null, profile);
  }
));

// const passport=require('passport');//import the file
// const GoogleStrategy=require('passport-google-oauth20');//import the google auth 20
// passport.use(new GoogleStrategy({
// 	clientID:'696016007441-gtdnqjpl3auit24qf2859efaks3t1lk2.apps.googleusercontent.com',
// 	clientSecret:'XqHHv9dFyJc18qPZvkY3tZFO',
// 	callbackURL:'/gajjurock',
// },
// (accessToken,refreshToken,profile,done)=>{
// 	//callback function and Data Of USER
// 	console.log(':::>',profile);
// 	console.log(">Hello Pappa",profile.emails[0].value);
// }));//set the object and then after the respomse to gather
