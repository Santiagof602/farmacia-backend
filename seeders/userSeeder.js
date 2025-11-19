/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * En este ejemplo se está insertando 1 usuario de prueba para desarrollo.
 */

const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = async () => {
  // Hash the password
  const hashedPassword = await bcrypt.hash("12345678", 10);

  // Create test user
  const users = [
    {
      firstname: "Usuario",
      lastname: "Prueba",
      email: "test@farmauy.com",
      password: hashedPassword,
      role: "user"
    }
  ];

  for (const u of users) {
    const [user, created] = await User.findOrCreate({ where: { email: u.email }, defaults: u });
    if (created) {
      console.log(`[Database] Usuario creado: ${u.email}`);
    } else {
      console.log(`[Database] Usuario existente: ${u.email}`);
    }
  }

  console.log("[Database] Se corrió el seeder de Users (idempotente).");
};
