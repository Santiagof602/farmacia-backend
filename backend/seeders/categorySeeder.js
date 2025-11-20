const { Category } = require('../models');

module.exports = async () => {
  try {
    const categories = [
      { name: 'Medicamentos', description: 'Productos farmacéuticos y medicamentos' },
      { name: 'Cuidado Personal', description: 'Cosmética y artículos de higiene personal' },
      { name: 'Suplementos', description: 'Vitaminas y suplementos nutricionales' },
      { name: 'Ofertas', description: 'Productos en promoción y descuento' },
      { name: 'Otros', description: 'Productos varios (uso futuro)' },
    ];

    for (const cat of categories) {
      await Category.findOrCreate({ where: { name: cat.name }, defaults: cat });
    }

    console.log(`[Database] Se corrió el seeder de Categories - ${categories.length} categoría(s) creada(s)/existentes.`);
  } catch (error) {
    console.error('[Seeder] Error al insertar categorías:', error);
  }
};

if (require.main === module) {
  module.exports().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
