require('dotenv').config();
const db = require('./models');

async function migrate() {
  try {
    console.log('\n[Migration] Ejecutando sequelize.sync({ alter: true }) para aplicar cambios no destructivos...');
    await db.sequelize.sync({ alter: true });
    console.log('[Migration] Sincronización completada. Tablas creadas/alteradas según sea necesario.');
    process.exit(0);
  } catch (err) {
    console.error('[Migration] Error durante la migración:', err);
    process.exit(1);
  }
}

migrate();
