const Sequelize = require("sequelize");

const sequelize = new Sequelize("seq_demo", "root", "Souro2000@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
