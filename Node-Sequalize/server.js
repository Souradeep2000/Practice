const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const User = require("./models/users");
const Product = require("./models/products");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const sequelize = require("./util/database");
const res = require("express/lib/response");

//this will check every sql model and create necessary tables if not present otherwise sync everything

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hola");
});

//then and catch can be used after resolving a promise and using app.get for example only
sequelize
  .sync() // { force: true } forcefully updated table
  .then((result) => {
    //console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Souro", email: "test@gmail.com" });
    }
    //return Promise.resolve(user); // this will instantly solve the promise
    return user; //the above line and this one is same
  })
  .then((user) => {
    //console.log(user);
    return user.createCart();
  })
  .then((cart) => {})
  .catch((err) => console.log(err));

//----------------------------------product-----------------------------------

app.get("/postproduct", (req, res, next) => {
  //const title = req.body.title;
  Product.create({
    title: "product 1",
    price: 100,
    imageUrl: "www.google.com",
    description: "best product ever",
  })
    .then((result) => {
      //console.log(result);
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/getproduct", (req, res, next) => {
  Product.findAll()
    .then((result) => {
      //console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getoneproduct", (req, res, next) => {
  Product.findByPk(1)
    .then((result) => {
      //console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//this api is same as getoneproduct but here using classic sql where command
app.get("/usingSqlCommand", (req, res, next) => {
  Product.findAll({ where: { id: 1 } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/updateOneproduct", (req, res) => {
  const updatedTitle = "Product Updated";
  Product.findByPk(2)
    .then((result) => {
      result.title = updatedTitle;
      result.save(); //to save the updated changes
    })
    .catch((err) => console.log(err));
  res.redirect("/");
});

app.get("/deleteProduct", (req, res) => {
  Product.findByPk(4)
    .then((result) => {
      return result.destroy(); //we can return this as it is a promise then we can use the returned promise in another then() block
    })
    .then((mess) => {
      console.log("destroyed product");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  res.redirect("/");
});

// ------------------------------- > ASSOCIATIONS <-----------------------------

//Now we will use relational models for example an user created an product and is connected to that product

//creating an association between produts and users like users can have multiple products

User.hasMany(Product); //one user can add many products to the shop
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // onDelete says that if an user is deleted then what
//happens to the connected products. Cascade means delete all products

User.hasOne(Cart);
Cart.belongsTo(User);

//----------- many to many relationships because 1 cart can hold multiple products and
// also a single product can be part of multiple different carts --------------------

Cart.belongsToMany(Product, { through: CartItem }); //telling sequelize where these connections should be stored(CartItem)
Product.belongsToMany(Cart, { through: CartItem });

//----------------------------------  cart -------------------------------------------

app.get("/cart", (req, res, next) => {
  //console.log(req.user.cart);
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart.getProducts().then((products) => {
  //       res.send(products);
  //     });
  //   })
  //   .catch((err) => console.log(err));
  //can use the getCart method because of the association
});

app.listen(3000, (req, res) => {
  console.log("listening to port 3000");
});
