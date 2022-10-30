const express = require("express");
const app = express();

const PORT = 5000;

//setting up view engine to render html
app.set("view engine", "ejs");

//setting up get request on the root
app.get("/", (req, res) => {
  //we use render instead of send.
  // we set the path to the index file
  res.render("index");
});

app.listen(PORT, console.log("Server has started on Port 5000"));
