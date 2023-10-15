import { Router } from "express";
import { createNews, deleteNews, editNews, getNews, getNewsById } from "../controllers/newsController.ts";
const router = Router();

router.get("/", getNews);
router.get("/:id",getNewsById);
router.post("/", createNews);
router.put("/:id", editNews);
router.delete("/:id", deleteNews);

export default router;
