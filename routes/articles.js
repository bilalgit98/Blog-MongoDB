const express = require("express");

//to create routes we will need to use a router
const router = express.Router();

//creating a get route
router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.post("/", (req, res) => {});

//exporting the routes
module.exports = router;
