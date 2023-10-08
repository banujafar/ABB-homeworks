import express from "express";
import "dotenv/config";
import router from "./app.router.ts";
import loggingMiddleware from "./loggingMiddleware.ts";

const app = express();
app.use(express.json());

app.use(loggingMiddleware);
app.use("/newsposts", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});
