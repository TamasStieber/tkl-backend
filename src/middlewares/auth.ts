import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";
import * as config from "../config/config";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "Unauthorized access" });

  const [authorizationType, authorizationToken] = header.split(" ");

  if (authorizationType === "Bearer" && authorizationToken) {
    try {
      jwt.verify(authorizationToken, config.JWT_SECRET);

      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
};

export default authorize;
