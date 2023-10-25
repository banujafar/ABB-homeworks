import express from "express";
import http from "http";
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
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import newsService from "./services/news.service.ts";
import { News } from "./entities/News.entity.ts";
import { User } from "./entities/User.entity.ts";

AppDataSource.initialize()
  .then(() => {
    console.log("connection has established....");
  })
  .catch((err) => {
    console.log("There is an error with connection");
  });

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);

const publicDir = path.dirname(__filename);
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/news", (req, res) => {
  res.render("news");
});
io.on("connect", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("send news", ({ title, text }) => {
    AppDataSource.getRepository(News).save({ title, text });
    io.emit("add news", { title, text });
  });
  socket.on("send deleted id", (id) => {
    AppDataSource.getRepository(News).delete(id);
    io.emit("delete from client", id);
  });
  socket.on("send edited id", async ({ editedId, title, text }) => {
    const news = await newsService.getNewsById(editedId);
    if (news) {
      const body = {
        title,
        text,
        author: news.author,
      };
      await newsService.updateNews(editedId, body);
    }
    io.emit("edit from client", { editedId, title, text });
  });
});

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
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.set("view engine", "hbs");
server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
  swaggerDocs(app, process.env.PORT);
});
