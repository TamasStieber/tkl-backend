import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as config from "../config/config";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Unauthorized access" });

  const [authorizationType, authorizationToken] = token.split(" ");

  if (authorizationType === "Bearer" && authorizationToken) {
    try {
      jwt.verify(authorizationToken, config.JWT_SECRET);
      return res.status(200).json({ valid: true });
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized access" });
  }
});

export default router;
