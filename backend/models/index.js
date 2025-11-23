const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE || "ha_db", // Ej: hack_academy_db
  process.env.DB_USERNAME || "root", // Ej: root
  process.env.DB_PASSWORD || "root", // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION || "mysql", // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

// Requerir todos los modelos:
const User = require("./User");
const Article = require("./Article");
const Category = require("./Category");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Inicializar todos los modelos:
User.initModel(sequelize);
Article.initModel(sequelize);
Category.initModel(sequelize);
Order.initModel(sequelize);
OrderItem.initModel(sequelize);

/*
 * Relaciones entre modelos
 */

// Un User puede tener muchas Orders
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Una Order puede tener muchos OrderItems
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Un Article puede estar en muchos OrderItems
Article.hasMany(OrderItem, { foreignKey: 'articleId' });
OrderItem.belongsTo(Article, { foreignKey: 'articleId' });

// Categorías
Category.hasMany(Article, { foreignKey: 'categoryId' });
Article.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  sequelize,
  User,
  Article,
  Category,
  Order,
  OrderItem,
};
