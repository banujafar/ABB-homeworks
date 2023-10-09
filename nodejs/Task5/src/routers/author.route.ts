import Router, { Request, Response } from "express";
import { AppDataSource } from "../data-source.ts";
import { User } from "../entities/User.entity.ts";

const authorRouter = Router();
authorRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = User.create({
      username: username,
    });
    await user.save();
    res.status(201).json("User has been created successfully");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

authorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await AppDataSource.getRepository(User).find({
      relations: ["news"],
    });
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

export default authorRouter;
