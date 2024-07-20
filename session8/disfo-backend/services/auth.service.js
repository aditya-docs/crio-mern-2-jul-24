const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

class AuthService {
  signup = async (payload) => {
    // const newUser = new User({
    //   ...payload,
    //   password: await this.generatePasswordHash(payload.password),
    // });
    // await newUser.save();
    const newUser = await User.create({
      ...payload,
      password: await this.generatePasswordHash(payload.password),
    });
    return newUser;
  };

  generatePasswordHash = (myPlaintextPassword) =>
    bcrypt.hash(myPlaintextPassword, 8);

  login = async (password, hasedPassword) => ({
    isLoggedIn: await bcrypt.compare(password, hasedPassword),
  });

  generateJwt = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1m" });

  verifyJwt = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = AuthService;
