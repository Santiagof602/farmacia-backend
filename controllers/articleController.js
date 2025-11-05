const { Article } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const articles = await Article.findAll();
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving articles" });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.json(article);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving article" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const { title, content } = req.body;
    const article = await Article.create({
      title,
      content,
    });
    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ message: "Error creating article" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    await article.update(req.body);
    return res.json(article);
  } catch (error) {
    return res.status(500).json({ message: "Error updating article" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    await article.destroy();
    return res.json({ message: "Article deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting article" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
