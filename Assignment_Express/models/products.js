const db = require("../util/database");

const product = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // the question mark is to prevent sql injection where hackers can run special data as sql querries
    return db.execute(
      "INSERT INTO products(title, price, imageUrl, description) VALUES(?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM  products");
  }

  static findByID(id) {
    //fetching single product
    //restricting the number of rows fetched by WHERE keyword
    return db.execute("SELECT * FROM products WHERE products.id = ? ", [id]);
  }
};

module.exports = product;
