const AuthService = require("../services/auth.service");
// const UserService = require("../services/user.service");
const AuthServiceInstance = new AuthService();
// const UserServiceInstance = new UserService();

const authorizeUser = (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization.split(" ")[1];
    const { userId } = AuthServiceInstance.verifyJwt(jwtToken);
    req.userId = userId;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

module.exports = { authorizeUser };
