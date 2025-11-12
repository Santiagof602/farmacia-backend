/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * En este ejemplo se está insertando UN producto de ejemplo para mostrar
 * cómo funciona el sistema de compras.
 */

const fs = require("fs").promises;
const path = require("path");
const { Article } = require("../models");

module.exports = async () => {
  try {
    const filePath = path.resolve(__dirname, "articles.json");
    const content = await fs.readFile(filePath, "utf8");
    const articles = JSON.parse(content);

    if (!Array.isArray(articles) || articles.length === 0) {
      console.log("[Seeder] articles.json está vacío o no es un array. Nada que insertar.");
      return;
    }

    await Article.bulkCreate(articles);
    console.log(
      `[Database] Se corrió el seeder de Articles - ${articles.length} producto(s) creado(s).`,
    );
  } catch (error) {
    console.error("[Seeder] Error al leer o insertar artículos:", error);
  }
};

// Permite ejecutar el seeder directamente: node seeders/articleSeeder.js
if (require.main === module) {
  module.exports().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
