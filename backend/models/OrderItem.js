const { Model, DataTypes } = require("sequelize");

class OrderItem extends Model {
  static initModel(sequelize) {
    OrderItem.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        orderId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        articleId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "orderItem",
      },
    );

    return OrderItem;
  }
}

module.exports = OrderItem;
