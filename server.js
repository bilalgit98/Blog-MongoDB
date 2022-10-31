const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();

const PORT = 5000;

//setting up view engine to render html
app.set("view engine", "ejs");

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
      dateCreated: 20 / 12 / 2022,
      description: "this is a description",
    },
    {
      title: "test2",
      dateCreated: 21 / 11 / 2022,
      description: "this is a description 2",
    },
  ];

  //article is passed to the index file.
  //article will use the variable  articles to get "articles"
  res.render("index", { article: articles });
});

app.listen(PORT, console.log("Server has started on Port 5000"));
