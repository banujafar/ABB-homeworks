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
  const news = await News.createQueryBuilder('news')
  .select(['news.id', 'news.title', 'news.text', 'author.email'])
  .leftJoin('news.author', 'author')
  .getMany();

  return news;
};

const getNewsById = async (id: string) => {
  const news = await News.createQueryBuilder('news')
  .select(['news.id', 'news.title', 'news.text', 'author.email'])
  .leftJoin('news.author', 'author')
  .getMany();
  const findedNews = news.find((singleNews) => singleNews.id === id);
  return findedNews;
};

const createNewNews = async (body: INews) => {
  const author = body.author || null;
  const newNews = await News.create({
    title: body.title,
    text: body.text,
    author: author,
  });
  const result = await News.save(newNews);
  return result;
};

const updateNews = async (id: string, body: INews) => {
  let updatedNews = await News.findOneBy({ id });
  if (updatedNews) {
    AppDataSource.getRepository(News).merge(updatedNews, body);
    const result = await News.save(updatedNews);
    return result;
  } else {
    throw new Error("News not found");
  }
};

const deleteNews = async (id: string) => {
  const results = await News.delete(id);
  return results;
};

export default {
  getNews,
  getNewsById,
  createNewNews,
  updateNews,
  deleteNews,
};
