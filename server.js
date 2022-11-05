const express = require("express");
const mongooese = require("mongoose");
//article model
const Article = require("./model/article");
const articleRouter = require("./routes/articles");
const app = express();
const methodOverride = require("method-override");
const PORT = 5000;

//connecting to the database (MongoDB)
mongooese.connect("mongodb://localhost/blog");

//setting up view engine to render html
app.set("view engine", "ejs");

//using middleware
app.use(express.urlencoded({ extended: false }));

//using method-override
app.use(methodOverride("_method"));

//using the articleRouter
app.use("/articles", articleRouter);

//setting up get request on the root
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ dateCreated: "desc" });

  //article is passed to the index file.
  //article will use the variable  articles to get "articles"
  res.render("articles/index", { article: articles });
});

app.listen(PORT, console.log("Server has started on Port 5000"));
