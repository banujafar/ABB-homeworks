import { Request, Response } from "express";
import { getNewsFromDB, writeNewsToDB } from "../newsDbOperations.ts";
import { v4 as uuidv4 } from "uuid";

interface INews {
  id: string;
  title: string;
  text: string;
}

const getNews = async (req: Request, res: Response) => {
  try {
    const news = await getNewsFromDB();
    const { query } = req;
    if (
      !query.size ||
      !query.page ||
      isNaN(+query.page) ||
      isNaN(+query.size)
    ) {
      console.error("Undefined query parameters");
      return res.status(400).json("Bad Request");
    }

    const size = +query.size;
    const page = +query.page;
    const startIndex = (page - 1) * size;
    const endIndex = size * page;
    const paginatedNews = news.slice(startIndex, endIndex);
    res.status(200).json(paginatedNews);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const getNewsById = async (req: Request, res: Response) => {
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
};

const createNews = async (req: Request, res: Response) => {
  try {
    const news = await getNewsFromDB();
    const id: string = uuidv4();
    if (!Object.keys(req.body).length) {
      res.status(400).json("No body provided");
    }
    const newNewsItem: INews = { ...req.body, id };
    news.push(newNewsItem);
    res.status(201).json("News has been created successfully");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const editNews = async (req: Request, res: Response) => {
  try {
    const news = await getNewsFromDB();
    const { id } = req.params;

    if (!id || id.trim() === "") {
      res.status(400).json("Bad Request: Missing or empty 'id' parameter.");
    }
    if (!Object.keys(req.body).length) {
      res.status(400).json("Bad Request: Empty request body.");
    }
    const findedNews = news.find((singleNews: INews) => singleNews.id === id);
    if (findedNews) {
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
};

const deleteNews = async (req: Request, res: Response) => {
  try {
    let news = await getNewsFromDB();
    const { id } = req.params;
    if (!id || id.trim() === "") {
      res.status(400).json("Bad Request: Missing or empty 'id' parameter.");
      return;
    }
    const deletedNews = news.find((singleNews: INews) => singleNews.id === id);
    if (deletedNews) {
      news = news.filter((singleNews: INews) => singleNews.id !== id);
      await writeNewsToDB(news);
      res.status(200).json("News has been deleted successfully");
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export { getNews, getNewsById, createNews, editNews, deleteNews };
