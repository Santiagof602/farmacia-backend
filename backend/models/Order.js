const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
          defaultValue: 'pending',
        },
      },
      {
        sequelize,
        modelName: "order",
      },
    );

    return Order;
  }
}

module.exports = Order;
