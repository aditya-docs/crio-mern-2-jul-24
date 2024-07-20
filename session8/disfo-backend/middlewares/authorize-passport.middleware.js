const passport = require("../config/passport");

const authenticate = passport.authenticate("jwt", { session: false });

module.exports = authenticate;
