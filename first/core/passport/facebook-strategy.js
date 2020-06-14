var express = require('express');
var app = express();

var passport = require('passport');
const { Strategy } = require('passport-facebook');

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, SESS_SECRET } =  config.social.facebook;
passport.use(new Strategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/en/hybridauth/return/facebook'
},
(accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((obj, cb) => {
cb(null, obj);
});
module.exports = passport;
