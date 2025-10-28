const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "El nombre de la categoría no puede estar vacío",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "category",
        tableName: "categories",
        timestamps: true,
      },
    );

    return Category;
  }
}

module.exports = Category;