const Joi = require("joi");

const blogSearchSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string().email(),
}).min(1);

const blogSearchValidator = (req, res, next) => {
  const { title, author } = req.query;
  const { error } = blogSearchSchema.validate({ title, author });
  if (error) return res.status(400).send({ message: error.details[0].message });
  next();
};

module.exports = blogSearchValidator;
