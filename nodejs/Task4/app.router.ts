import { Request, Response, Router } from "express";
import { getNewsFromDB, writeNewsToDB } from "./newsDbOperations.ts";
import { v4 as uuidv4 } from "uuid";

interface INews {
  id: string;
  title: string;
  text: string;
}

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const news = await getNewsFromDB();
    const { query } = req;
    const size = query.size ? +query.size : 10;
    const page = query.page ? +query.page : 1;
    const startIndex = (page - 1) * size;
    const endIndex = size * page;
    const paginatedNews = news.slice(startIndex, endIndex);
    res.status(200).json(paginatedNews);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const news = await getNewsFromDB();
    const findedNews = news.find(
      (singleNews: INews) => singleNews.id === req.params.id
    );
    if (findedNews) {
      res.status(200).json(findedNews);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const news = await getNewsFromDB();
    const id: string = uuidv4();
    const newNewsItem: INews = { ...req.body, id };
    news.push(newNewsItem);
    res.status(201).json("News has been created successfully");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const news = await getNewsFromDB();
    const findedNews = news.find(
      (singleNews: INews) => singleNews.id === req.params.id
    );
    if (findedNews !== -1) {
      const updatedNews = news.map((singleNews: INews) => {
        if (singleNews.id === req.params.id) {
          return { ...singleNews, ...req.body };
        }
        return singleNews;
      });
      await writeNewsToDB(updatedNews);
      res.status(200).json("News has been updated successfully");
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    let news = await getNewsFromDB();
    const deletedNews = news.find(
      (singleNews: INews) => singleNews.id === req.params.id
    );
    if (deletedNews !== -1) {
      news = news.filter(
        (singleNews: INews) => singleNews.id !== req.params.id
      );
      await writeNewsToDB(news);
      res.status(200).json("News has been deleted successfully");
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

export default router;
