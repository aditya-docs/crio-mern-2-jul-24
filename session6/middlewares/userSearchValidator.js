const { getQueryError } = require("../validators/users.validator");

const userSearchValidator = (req, res, next) => {
  const { gender, age } = req.query;
  const { error } = getQueryError({
    gender,
    age: age && Number(age),
  });
  console.log(error);
  if (error) return res.status(400).send({ message: error.details[0].message });
  next();
};

module.exports = userSearchValidator;
