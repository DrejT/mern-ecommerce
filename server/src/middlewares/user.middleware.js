require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const UserModel = require("./../models/user.models");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
// opts.issuer = "mydomainname.com";
// opts.audience = "yoursite.net";
// opts.jsonWebTokenOptions = {
//   maxAge: 1000 * 60,
// };
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);
    (async function () {
      const user = await UserModel.findById(jwt_payload.userid, "-password");
      if (!user) {
        return done(user, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    })();
  })
);
