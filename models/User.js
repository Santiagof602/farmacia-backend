const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 100],
          },
        },
        role: {
          type: DataTypes.ENUM("admin", "user"),
          defaultValue: "user",
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "user", // Nombre del modelo en singular y en minúscula.
        paranoid: true, // Habilita el borrado lógico (soft delete).
        hooks: {
          beforeCreate: async (user) => {
            user.password = user.password.toLowerCase();
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          },
          beforeUpdate: async (user) => {
            if (user.changed("password")) {
              user.password = user.password.toLowerCase();
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
            }
          },
        },
        // timestamps: true, // Habilita las marcas de tiempo (createdAt, updatedAt).
        // underscored: true, // Usa snake_case para los nombres de las columnas.
      },
    );
    return User;
  }
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
  async validatePassword(password) {
    return await bcrypt.compare(password.toLowerCase(), this.password);
  }
}

module.exports = User;
