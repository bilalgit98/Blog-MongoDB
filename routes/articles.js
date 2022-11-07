const express = require("express");

//importing the articles schema
const Article = require("./../model/article");

//to create routes we will need to use a router
const router = express.Router();

//creating a get route
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

//creating the edit route
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

//creating the put route
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  SaveAndRedirect("edit")
);

router.get("/:slug", async (req, res) => {
  //finding articles by slug
  //we have to do "findOne" instead of find, because find will return an array.

  const article = await Article.findOne({ slug: req.params.slug });
  //if statement to see if the article exists or not.
  if (article === null) {
    res.redirect("/");
  }
  //rendering out our new page
  res.render("articles/show", { article: article });
});

//route for submiting a form
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();

    //   let article = new Article({
    //     title: req.body.title,
    //     description: req.body.description,
    //     markdown: req.body.markdown,
    //   });
    //   try {
    //     article = await article.save();
    //     //we are redirecting to the user.
    //     //it will use the route ('/id')
    //     res.redirect(`/articles/${article.slug}`);
    //   } catch (error) {
    //     res.render("articles/new", { article: article });
    //     //logging our errors
    //     console.log(error);
    //   }

    //we use the next function so it goes on to the next line
    next();
  },
  SaveAndRedirect("new")
);

//creating the delete route
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//function for SaveAndRedirect
function SaveAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;

    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      article = await article.save();
      //we are redirecting to the user.

      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      console.log(error);
      res.render(`articles/${path}`, { article: article });
    }
  };
}

//exporting the routes
module.exports = router;
