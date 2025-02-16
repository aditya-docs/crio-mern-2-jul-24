const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

const myJwtStrategy = new JWTStrategy(options, async (payload, done) => {
    try {
      const user = await UserServiceInstance.findById(payload.userId);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
});

passport.use(myJwtStrategy)

module.exports = passport;
