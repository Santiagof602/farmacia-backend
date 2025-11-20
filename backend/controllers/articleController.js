const { Article } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const articles = await Article.findAll({
      include: [{ model: require("../models").Category }] // Incluir categoría en la respuesta
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos', error: error.message });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: require("../models").Category }] // Incluir categoría en la respuesta
    });

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
    let { name, description, price, image, stock, categoryId } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }

    // Normalizar y convertir tipos
    name = String(name).trim();
    description = description !== undefined ? String(description).trim() : null;
    const priceNum = Number(price);
    const stockNum = stock !== undefined ? parseInt(stock, 10) : 0;

    if (Number.isNaN(priceNum)) {
      return res.status(400).json({ message: 'Precio inválido' });
    }
    if (isNaN(stockNum) || stockNum < 0) {
      return res.status(400).json({ message: 'Stock inválido' });
    }

    const article = await Article.create({
      name,
      description: description || null,
      price: priceNum,
      image: image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
      stock: stockNum,
      categoryId: categoryId || null
    });

    res.status(201).json({
      message: 'Artículo creado exitosamente',
      article
    });
  } catch (error) {
    console.error('[Article Controller] Error al crear artículo:', error);
    res.status(500).json({ 
      message: 'Error al crear artículo',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    let { name, description, price, image, stock, categoryId } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = String(name).trim();
    if (description !== undefined) updates.description = description === null ? null : String(description).trim();
    if (price !== undefined) {
      const priceNum = Number(price);
      if (Number.isNaN(priceNum)) return res.status(400).json({ message: 'Precio inválido' });
      updates.price = priceNum;
    }
    if (image !== undefined) updates.image = image;
    if (stock !== undefined) {
      const stockNum = parseInt(stock, 10);
      if (isNaN(stockNum) || stockNum < 0) return res.status(400).json({ message: 'Stock inválido' });
      updates.stock = stockNum;
    }
    if (categoryId !== undefined) updates.categoryId = categoryId;

    await article.update(updates);

    res.json({ 
      message: 'Artículo actualizado correctamente',
      article 
    });
  } catch (error) {
    console.error('[Article Controller] Error al actualizar artículo:', error);
    res.status(500).json({ 
      message: 'Error al actualizar artículo',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
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
