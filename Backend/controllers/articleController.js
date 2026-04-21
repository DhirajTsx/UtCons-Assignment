import Article from "../models/Article.js";
import logAction from "../utils/logAction.js";

// CREATE
export const createArticle = async (req, res) => {
  const article = await Article.create({
    ...req.body,
    createdBy: req.user.id
  });

  await logAction(req.user.id, "CREATE_ARTICLE", article._id);

  res.json(article);
};

// GET ALL
export const getArticles = async (req, res) => {
  let articles;

  if (req.user.role === "viewer") {
    articles = await Article.find({ status: "published" });
  } else {
    articles = await Article.find();
  }

  res.json(articles);
};

// GET ONE
export const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) return res.status(404).json({ msg: "Not found" });

  if (article.status === "draft") {
    if (
      req.user.role !== "admin" &&
      article.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Forbidden" });
    }
  }

  res.json(article);
};

// PUBLISH
export const publishArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) return res.status(404).json({ msg: "Not found" });

  if (article.status === "published") {
    return res.status(400).json({ msg: "Already published" });
  }

  if (
    req.user.role !== "admin" &&
    article.createdBy.toString() !== req.user.id
  ) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  article.status = "published";
  await article.save();

  await logAction(req.user.id, "PUBLISH_ARTICLE", article._id);

  res.json(article);
};

// DELETE
export const deleteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) return res.status(404).json({ msg: "Not found" });

  if (
    req.user.role !== "admin" &&
    article.createdBy.toString() !== req.user.id
  ) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  await article.deleteOne();

  await logAction(req.user.id, "DELETE_ARTICLE", article._id);

  res.json({ msg: "Deleted" });
};