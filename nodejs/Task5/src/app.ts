import express from "express";
import "dotenv/config";
import loggingMiddleware from "./loggingMiddleware.ts";
import { AppDataSource } from "./data-source.ts";
import authorRouter from "./routers/author.route.ts";
import newsRouter from "./routers/news.route.ts";

AppDataSource.initialize()
  .then(() => {
    console.log("connection has established....");
  })
  .catch((err) => {
    console.log("There is an error with connection");
  });

const app = express();
app.use(express.json());

app.use(loggingMiddleware);
app.use("/authors", authorRouter);
app.use("/newsposts", newsRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});
