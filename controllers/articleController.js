const { Article } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos', error: error.message });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículo', error: error.message });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const { name, description, price, image, stock, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }

    const article = await Article.create({
      name,
      description,
      price,
      image,
      stock: stock || 0,
      category: category || 'Otros'
    });

    res.status(201).json({
      message: 'Artículo creado exitosamente',
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear artículo', error: error.message });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    const { name, description, price, image, stock, category } = req.body;

    await article.update({
      name,
      description,
      price,
      image,
      stock,
      category
    });

    res.json({ message: 'Artículo actualizado', article });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar artículo', error: error.message });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    await article.destroy();
    res.json({ message: 'Artículo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar artículo', error: error.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
