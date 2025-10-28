const { Category } = require("../models");  

async function index(req, res) {
  try {
    const categories = await Category.findAll({
      order: [["nombre", "ASC"]],
    });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ 
      message: "Error al obtener las categorías",
      error: error.message 
    });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ 
        message: "Categoría no encontrada" 
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ 
      message: "Error al obtener la categoría",
      error: error.message 
    });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ 
        message: "El nombre de la categoría es requerido" 
      });
    }

    const category = await Category.create({ nombre });

    return res.status(201).json({
      message: "Categoría creada exitosamente",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error al crear la categoría",
      error: error.message 
    });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ 
        message: "Categoría no encontrada" 
      });
    }

    if (nombre) {
      category.nombre = nombre;
    }

    await category.save();

    return res.status(200).json({
      message: "Categoría actualizada exitosamente",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error al actualizar la categoría",
      error: error.message 
    });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ 
        message: "Categoría no encontrada" 
      });
    }

    await category.destroy();

    return res.status(200).json({ 
      message: "Categoría eliminada exitosamente" 
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error al eliminar la categoría",
      error: error.message 
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