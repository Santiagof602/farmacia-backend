/*
 * Este archivo se encarga de crear todas las tablas del sistema.
 *
 * En caso de que las tablas ya existían, se eliminan y se crean
 * nuevamente.
 *
 * Para ejecutar este archivo se debe correr el comando:
 *
 * 👉 node createDatabaseTables.js
 *
 * Como alternativa, en el artchivo package.json se creó un comando "alias"
 * para que la ejecución sea un poco más corta:
 *
 * 👉 npm run tables
 */

require("dotenv").config();
const db = require("./models");

async function createDatabaseTables() {
  console.log("\n⚠️  [ADVERTENCIA] ⚠️");
  console.log("Se procederá a RECREAR todas las tablas de la base de datos.");
  console.log("❌ TODOS LOS DATOS EXISTENTES SERÁN ELIMINADOS ❌\n");
  console.log("Si deseas preservar los datos, cancela este proceso (Ctrl+C) ahora.\n");
  
  // Esperar 3 segundos para que el usuario pueda leer el mensaje
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log("Proceediendo con la recreación de tablas...\n");
  
  await db.sequelize.sync({ force: true });
  console.log("[Database] ¡Las tablas fueron creadas!");
  console.log("[Database] Se agregó constraint UNIQUE en field 'name' de tabla 'articles'.");
  process.exit();
}

createDatabaseTables();
