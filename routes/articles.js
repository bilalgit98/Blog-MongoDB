const express = require("express");

//importing the articles schema
const Article = require("./../model/article");

//to create routes we will need to use a router
const router = express.Router();

//creating a get route
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  //finding articles by id
  const article = await Article.findById(req.params.id);
  //if statement to see if the article exists or not.
  if (article === null) {
    res.redirect("/");
  }
  //rendering out our new page
  res.render("articles/show", { article: article });
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
