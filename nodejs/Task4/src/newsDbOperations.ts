import { readFile, writeFile } from "fs/promises";

interface INews {
  id: string;
  title: string;
  text: string;
}

const getNewsFromDB = async () => {
  try {
    const data = await readFile("./db/news.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log("error", err);
  }
};

const writeNewsToDB = async (news: INews[]) => {
  try {
    await writeFile("./db/news.json", JSON.stringify(news));
  } catch (err) {
    console.error("Error writing news data", err);
  }
};

export { getNewsFromDB, writeNewsToDB };
