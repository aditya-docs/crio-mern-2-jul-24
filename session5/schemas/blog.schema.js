const mongoose = require("mongoose");
// const blogSchema = new mongoose.Schema({
//     title: String, //Title is string
//     authors: [String], //Authors is an array of strings
//     content: String, //Content is string
//     publishedAt: Date, //publishedAt is Date
// })

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, cast: false },
    authors: { type: [String] },
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = blogSchema;
