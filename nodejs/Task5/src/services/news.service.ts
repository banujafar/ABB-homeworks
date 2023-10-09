import { User } from "src/entities/User.entity.ts";
import { AppDataSource } from "../data-source.ts";
import { News } from "../entities/News.entity.ts";

interface INews {
  id?: string;
  title: string;
  text: string;
  author: User;
}

const getNews = async () => {
  const news = await AppDataSource.getRepository(News).find({
    relations: ["author"],
  });
  return news;
};

const getNewsById = async (id: string) => {
  const news = await AppDataSource.getRepository(News).find({
    relations: ["author"],
  });
  const findedNews = news.find((singleNews) => singleNews.id === id);
  return findedNews;
};

const createNewNews = async (body: INews) => {
  const author = body.author || null;
  const newNews = await AppDataSource.getRepository(News).create({
    title: body.title,
    text: body.text,
    author: author,
  });
  const result = await AppDataSource.getRepository(News).save(newNews);
  return result;
};

const updateNews = async (id: string, body: INews) => {
  let updatedNews = await AppDataSource.getRepository(News).findOneBy({ id });
  if (updatedNews) {
    AppDataSource.getRepository(News).merge(updatedNews, body);
    const result = await AppDataSource.getRepository(News).save(updatedNews);
    return result;
  } else {
    throw new Error("News not found");
  }
};

const deleteNews = async (id: string) => {
  const results = await AppDataSource.getRepository(News).delete(id);
  return results;
};

export default {
  getNews,
  getNewsById,
  createNewNews,
  updateNews,
  deleteNews,
};
