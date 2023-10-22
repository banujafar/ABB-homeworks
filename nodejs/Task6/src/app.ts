import express from "express";
import "dotenv/config";
import {
  loggingMiddleware,
  authMiddleware,
} from "./middlewares/loggingMiddleware.ts";
import { AppDataSource } from "./data-source.ts";
import authorRouter from "./routers/author.route.ts";
import newsRouter from "./routers/news.route.ts";
import session from "express-session";
import passport from "passport";
import swaggerDocs from "./utils/swagger.ts";

AppDataSource.initialize()
  .then(() => {
    console.log("connection has established....");
  })
  .catch((err) => {
    console.log("There is an error with connection");
  });

const app = express();
const session_secret = process.env.SESSION_SECRET
  ? process.env.SESSION_SECRET
  : [];
app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());

app.use(loggingMiddleware);
app.use("/auth", authorRouter);
app.use("/newsposts", authMiddleware, newsRouter);

app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
  swaggerDocs(app, process.env.PORT);
});
