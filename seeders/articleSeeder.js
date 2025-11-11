/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * En este ejemplo se está insertando UN producto de ejemplo para mostrar
 * cómo funciona el sistema de compras.
 */

const { Article } = require("../models");

module.exports = async () => {
  // Crear 1 producto de ejemplo
  const articles = [
    {
      name: "Paracetamol 500mg",
      description: "Analgésico y antipirético de uso común. Indicado para dolores leves a moderados y fiebre. Caja de 20 comprimidos.",
      price: 150.00,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
      stock: 50,
      category: "Medicamentos"
    }
  ];

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles - 1 producto de ejemplo creado.");
};
