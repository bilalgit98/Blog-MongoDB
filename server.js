const express = require("express");
const mongooese = require("mongoose");
const articleRouter = require("./routes/articles");
const app = express();

const PORT = 5000;

//connecting to the database (MongoDB)
mongooese.connect("mongodb://localhost/blog");

//setting up view engine to render html
app.set("view engine", "ejs");

//using middleware
app.use(express.urlencoded({ extended: false }));

//using the articleRouter
app.use("/articles", articleRouter);

//setting up get request on the root
app.get("/", (req, res) => {
  //we use render instead of send.
  // we set the path to the index file
  //we pass the articles from the server to the index file.
  const articles = [
    {
      title: "test",
      dateCreated: new Date(),
      description: "this is a description",
    },
    {
      title: "test2",
      dateCreated: new Date(),
      description: "this is a description 2",
    },
  ];

  //article is passed to the index file.
  //article will use the variable  articles to get "articles"
  res.render("articles/index", { article: articles });
});

app.listen(PORT, console.log("Server has started on Port 5000"));
