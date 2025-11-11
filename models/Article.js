const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          defaultValue: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
        },
        stock: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        category: {
          type: DataTypes.ENUM('Medicamentos', 'Cuidado Personal', 'Suplementos', 'Otros'),
          defaultValue: 'Otros',
        },
      },
      {
        sequelize,
        modelName: "article", // Nombre del modelo en singular y en minúscula.
      },
    );

    return Article;
  }
}

module.exports = Article;
