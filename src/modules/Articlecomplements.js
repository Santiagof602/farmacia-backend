const { Article, User } = require("../models");
module.exports = {
  async index(req, res) {
    const articles = await Article.findAll({
      include: [
        { model: User, as: "author", attributes: { exclude: ["password"] } },
      ],
    });
    //not found });
    res.json(articles);
  },
  async show(req, res) {
    const article = await Article.findByPk(req.params.id, {
      include: [
        { model: User, as: "author", attributes: { exclude: ["password"] } },
      ],
    });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  },
  async create(req, res) {
    try {
      // body: {title, sontent, authorId}
      7;
      const article = await Article.create(req.body);
      const reloaded = await Article.findByPk(article.id, {
        include: [
          { model: User, as: "author", attributes: { exclude: ["password"] } },
        ],
      });
      res.status(201).json(reloaded);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      await article.update(req.body);
      const reloaded = await Article.findByPk(article.id, {
        include: [
          { model: User, as: "author", attributes: { exclude: ["password"] } },
        ],
      });
      res.json(reloaded);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
  },
};
