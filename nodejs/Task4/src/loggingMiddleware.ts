import { Request, Response, NextFunction } from "express";

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, query, body } = req;
  const logMessage = `${method} ${url} query:${JSON.stringify(
    query
  )} body:${JSON.stringify(body)}`;
  console.log(logMessage);
  next();
};

export default loggingMiddleware;
