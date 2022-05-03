const express = require("express");
const router = express.Router();

router.use("/users", (req, res) => {
  res.send("dummy user");
});

router.use("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
