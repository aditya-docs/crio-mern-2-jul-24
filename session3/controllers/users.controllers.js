// const usersJson = require("../users.json");
const axios = require("axios");
const userSearchSchema = require("../validators/userSearch.validator");

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

  const { error } = userSearchSchema.validate({
    gender,
    age: age && Number(age),
  });
  // console.log(JSON.stringify(error, null, 2));
  if (error) return res.status(400).send({ message: error.details[0].message });
  // if ((age && isNaN(age)) || age < 0 || age > 100)
  //   return res
  //     .status(400)
  //     .send({ message: "Age must be a number between 0 to 100" });

  // if (gender && !validGenders.includes(gender))
  //   return res
  //     .status(400)
  //     .send({ message: "Gender must be either male or female" });

  if (gender && age) {
    return res.send(
      response.data.data.filter(
        (user) => user.gender === gender && user.dob.age === Number(age)
      )
    );
  } else if (gender)
    return res.send(
      response.data.data.filter((user) => user.gender === gender)
    );
  else if (age)
    return res.send(
      response.data.data.filter((user) => user.dob.age === Number(age))
    );
  else
    res.status(400).send({
      message: "Missing Search Parameters, search using age and/or gender",
    });
};

module.exports = { getUsers, getUserById, searchUsersByGenderOrAge };
