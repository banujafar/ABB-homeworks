import { Router } from "express";
import newsService from "../services/news.service.ts";
import { User } from "../entities/User.entity.ts";

const newsRouter = Router();

// GET all news items or paginate them
newsRouter.get("/", async (req, res) => {
  try {
    const news = await newsService.getNews();

    const { size, page } = req.query;
    if (size && page) {
      const startIndex = (+page - 1) * +size;
      const endIndex = +size * +page;
      const paginatedNews = news.slice(startIndex, endIndex);

      if (paginatedNews.length > 0) {
        res.status(200).json(paginatedNews);
      } else {
        res.status(404).json([]);
      }
    } else {
      res.status(200).json(news);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// GET a single news item by ID
newsRouter.get("/:id", async (req, res) => {
  try {
    const news = await newsService.getNewsById(req.params.id);

    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// POST a new news item
newsRouter.post("/", async (req, res) => {
  try {
    const { authorId } = req.body;
    const author = await User.findOneBy({
      id: authorId,
    });
    console.log(author);
    const news = await newsService.createNewNews({ ...req.body, author });

    if (news) {
      res.status(201).json("News has been created successfully");
    } else {
      res.status(404).json("News Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// PUT (update) a news item by ID
newsRouter.put("/:id", async (req, res) => {
  const updatedNews = await newsService.updateNews(req.params.id, req.body);

  if (updatedNews) {
    res.status(201).json("News has been updated successfully");
  } else {
    res.status(404).json("News Not Found");
  }
});

// DELETE a news item by ID
newsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await newsService.deleteNews(req.params.id);

    if (result.affected === 1) {
      res.status(201).json("News has been deleted successfully");
    } else {
      res.status(404).json("News Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

export default newsRouter;
