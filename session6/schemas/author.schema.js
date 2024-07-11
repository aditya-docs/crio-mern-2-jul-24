const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, maxlength: 25 },
    twitterHandle: { type: String },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    image: {
      type: String,
      validate: {
        validator: (value) => validator.isURL(value, { protocols: ["https"] }),
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  {
    _id: false,
  }
);

module.exports = authorSchema;
