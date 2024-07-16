const bcrypt = require("bcrypt");
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
}

module.exports = AuthService;
