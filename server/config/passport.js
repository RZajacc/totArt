import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const opts = {
  secretOrKey: process.env.SECRET_OR_PRIVATE_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// *1. Defina a strategy
const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

// *2. Use strategy with passport
const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
