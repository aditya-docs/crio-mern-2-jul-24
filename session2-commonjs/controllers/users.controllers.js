// const usersJson = require("../users.json");
const axios = require("axios");

const downloadUsersFromAPI = async () =>
  axios.get(
    "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
  );

const getUsers = async (req, res) => {
  const response = await downloadUsersFromAPI();
  res.send(response.data.data);
};

const getUserById = async (req, res) => {
  const { uuid } = req.params;
  const response = await downloadUsersFromAPI();
  const reqUser = response.data.data.find((user) => user.login.uuid === uuid);
  if (reqUser) return res.send(reqUser);
  res
    .status(404)
    .send({ message: `User with uuid: ${uuid} could not be found` });
};

const searchUsersByGenderOrAge = async (req, res) => {
  const { gender, age } = req.query;
  const response = await downloadUsersFromAPI();
  if (gender && age) {
    return res.send(
      response.data.data.filter(
        (user) => user.gender === gender && user.dob.age == age
      )
    );
  } else if (gender)
    return res.send(
      response.data.data.filter((user) => user.gender === gender)
    );
  else if (age)
    return res.send(response.data.data.filter((user) => user.dob.age == age));
  else
    res.status(400).send({
      message:
        "At least one of 'gender' or 'age' must be sent as query parameters",
    });
};

module.exports = { getUsers, getUserById, searchUsersByGenderOrAge };
