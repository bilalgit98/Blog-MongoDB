const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

//exporting the schema to be used elsewhere
// 'Article' is the name of the database created.

module.exports = mongoose.model("Article", articleSchema);
