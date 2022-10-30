const express = require("express");

//to create routes we will need to use a router
const router = express.Router();

//creating a get route
router.get("/", (req, res) => {
  res.send("hello");
});

//exporting the routes
module.exports = router;
