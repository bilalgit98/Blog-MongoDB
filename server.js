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
  const articles = [{}];
  res.render("index", { articles: "hello" });
});

app.listen(PORT, console.log("Server has started on Port 5000"));
