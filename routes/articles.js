const express = require("express");

//importing the articles schema
const Article = require("./../model/article");

//to create routes we will need to use a router
const router = express.Router();

//creating a get route
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

//route for submiting a form
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    //we are redirecting to the user.
    //it will use the route ('/id')
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    res.render("articles/new", { article: article });

    //logging our errors
    console.log(error);
  }
});

//exporting the routes
module.exports = router;
