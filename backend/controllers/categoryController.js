const { Category } = require("../models");

// Display a listing of the resource (GET /categories)
async function index(req, res) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
}

// Display the specified resource (GET /categories/:id)
async function show(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categoría', error: error.message });
  }
}

// Store a newly created resource (POST /categories)
async function store(req, res) {
  try {
    let { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
    }

    // Normalizar
    name = String(name).trim();
    description = description !== undefined ? String(description).trim() : null;

    // Verificar que no exista una categoría con el mismo nombre
    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
    }

    const category = await Category.create({
      name,
      description: description || null,
      image: null // Opcional: agregar en futuro si es necesario
    });

    res.status(201).json({
      message: 'Categoría creada exitosamente',
      category
    });
  } catch (error) {
    console.error('[Category Controller] Error al crear categoría:', error);
    res.status(500).json({ 
      message: 'Error al crear categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
}

// Update the specified resource (PATCH /categories/:id)
async function update(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    let { name, description } = req.body;

    const updates = {};

    if (name !== undefined) {
      name = String(name).trim();
      
      // Verificar unicidad solo si el nombre cambió
      if (name !== category.name) {
        const existing = await Category.findOne({ where: { name } });
        if (existing) {
          return res.status(400).json({ message: 'Ya existe otra categoría con ese nombre' });
        }
      }
      
      updates.name = name;
    }

    if (description !== undefined) {
      updates.description = description === null ? null : String(description).trim();
    }

    await category.update(updates);

    res.json({ 
      message: 'Categoría actualizada correctamente',
      category 
    });
  } catch (error) {
    console.error('[Category Controller] Error al actualizar categoría:', error);
    res.status(500).json({ 
      message: 'Error al actualizar categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
}

// Remove the specified resource (DELETE /categories/:id)
async function destroy(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    // Opcional: Verificar si hay artículos asociados
    const articleCount = await category.countArticles ? await category.countArticles() : 0;
    if (articleCount > 0) {
      return res.status(400).json({ 
        message: `No se puede eliminar la categoría porque tiene ${articleCount} artículo(s) asociado(s)` 
      });
    }

    await category.destroy();
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    console.error('[Category Controller] Error al eliminar categoría:', error);
    res.status(500).json({ 
      message: 'Error al eliminar categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
