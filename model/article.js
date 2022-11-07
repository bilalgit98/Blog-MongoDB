const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const createDomPurifiy = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifiy(new JSDOM().window);

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
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

//creating a slug using validate.
articleSchema.pre("validate", function (next) {
  if (this.title) {
    //strict will remove any characters such as : in the slug
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();
});

//exporting the schema to be used elsewhere
// 'Article' is the name of the database created.

module.exports = mongoose.model("Article", articleSchema);
