const Joi = require("joi");

const validGenders = ["female", "male"];

// const userSearchSchema = Joi.object({
//   gender: Joi.string().valid(...validGenders),
//   age: Joi.number().integer().min(0).max(100),
// }).min(1);

const userSearchSchema = Joi.object({
  age: Joi.number().integer().min(0).max(100),
  gender: Joi.string().valid(...validGenders),
}).or("gender", "age");

const getQueryError = (data) => userSearchSchema.validate(data);

module.exports = { getQueryError };
