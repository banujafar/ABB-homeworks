import http from "http";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import querystring from "querystring";
dotenv.config();

const readFileFromDB = async () => {
  try {
    const data = await readFile("./db/news.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const app = http.createServer(async (req, res) => {
  const news = await readFileFromDB();

  if (req.url !== "/favicon.ico" && req.method === "GET") {
    const arrayofURL = req.url.split("/");
    const query = querystring.parse(arrayofURL[arrayofURL.length - 1].slice(1));
    const page = query.page || 1;
    const size = query.size || 10;

    const startIndex = (page - 1) * size;
    const endIndex = page * size;
    const paginatedNews = news.slice(startIndex, endIndex);

    if (paginatedNews.length === 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify([]));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(paginatedNews));
    }
  } else {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is up on ${process.env.HOST}:${process.env.PORT}`);
});
