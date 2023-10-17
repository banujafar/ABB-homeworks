import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false });
  console.log(req);
  const userSentToken = req.headers.authorization?.split(" ")[1];
  if (!userSentToken) {
    res.status(400).json({ msg: "Token is missing!" });
  } else {
    jwt.verify(userSentToken, "SECRET", (err, user) => {
      console.log(user);
      if (err) {
        res.status(401).json({ msg: "Token is wrong!" });
      } else {
        user = req.user;
        next();
      }
    });
  }
};

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, query, body } = req;
  const logMessage = `${method} ${url} query:${JSON.stringify(
    query
  )} body:${JSON.stringify(body)}`;
  console.log(logMessage);
  next();
};

export { loggingMiddleware, authMiddleware };
