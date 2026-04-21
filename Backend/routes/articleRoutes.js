import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  publishArticle,
  deleteArticle
} from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.patch("/:id/publish", publishArticle);
router.delete("/:id", deleteArticle);

export default router;