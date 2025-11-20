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
const { Article, Category } = require("../models");

module.exports = async () => {
  try {
    const filePath = path.resolve(__dirname, "articles.json");
    const content = await fs.readFile(filePath, "utf8");
    const articles = JSON.parse(content);

    if (!Array.isArray(articles) || articles.length === 0) {
      console.log("[Seeder] articles.json está vacío o no es un array. Nada que insertar.");
      return;
    }

    // Map category name -> categoryId
    const categories = await Category.findAll();
    const map = {};
    categories.forEach(c => { map[c.name] = c.id; });

    const prepared = articles.map(a => ({
      name: a.name,
      description: a.description || null,
      price: a.price,
      image: a.image || null,
      stock: a.stock || 0,
      categoryId: map[a.category] || null,
    }));

    for (const article of prepared) {
      await Article.findOrCreate({ where: { name: article.name }, defaults: article });
    }

    console.log(
      `[Database] Se corrió el seeder de Articles - ${prepared.length} producto(s) procesado(s) (idempotente).`,
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
