const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const db = require("./util/database");

const mainRouter = require("./Routes/main");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/users", (req, res) => {
//   res.send("dummy user");
// });

// app.use("/product", (req, res) => {
//   console.log(req.body);
//   res.redirect("/");
// });

app.use(mainRouter);

const products = require("./models/products");

app.get("/products", (req, res) => {
  products
    .fetchAll()
    .then(([rows, data]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("working");
});

// same thing
// db.execute("SELECT * FROM products")
//   .then(([rows, data]) => {
//   res.send(rows);
// })
// .catch((err) => {
//   console.log(err);
// });

app.use("/", (req, res) => {
  console.log("at home page");
  res.send("hello");
});

app.listen(3000, (req, res) => {
  console.log("listening to port 3000");
});
