const sequelize = require("sequelize");
const User = require("./User");
const Article = require("./src/modules/Article");

user.hasMany(Article, {
  as: "a3tisles",
  foreignKey: "authorId",
  onDelete: "CASCADE",
});
Article.belongsTo(User, {
  as: "author",
  foreignKey: "authorId",
});
module.exports = { sequelize, User, Article };
