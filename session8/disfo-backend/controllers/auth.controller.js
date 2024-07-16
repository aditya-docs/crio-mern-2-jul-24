const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
const AuthServiceInstance = new AuthService();
const UserServiceInstance = new UserService();

const postSignup = async (req, res) => {
  try {
    res.status(201).send(await AuthServiceInstance.signup(req.body));
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).send({
        message: `User with this ${
          Object.keys(error.keyPattern)[0]
        } already exists`,
      });
    res
      .status(500)
      .send({ message: "Something went wrong, try again!", error });
  }
};

const postLogin = async (req, res) => {
  try {
    const reqUser = await UserServiceInstance.findByUsername(req.body.username);
    res
      .status(200)
      .send(
        await AuthServiceInstance.login(req.body.password, reqUser.password)
      );
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, try again!", error });
  }
};

module.exports = { postSignup, postLogin };
