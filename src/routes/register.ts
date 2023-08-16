import * as config from "../config/config";
import { Router } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import _ from "lodash";
import { IRegisterData } from "../interfaces/interfaces";

const router = Router();

router.post("/", async (req, res, next) => {
  if (config.NODE_ENV !== "develop")
    return res.status(503).json({ error: "Service is unavailable" });

  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "Unauthorized access" });

  const [authorizationType, authorizationToken] = header.split(" ");

  if (
    authorizationType !== "Bearer" ||
    authorizationToken !== config.REGISTER_KEY
  )
    return res.status(401).json({ error: "Unauthorized access" });

  const newUser = req.body as IRegisterData;

  if (!newUser.email || !newUser.password)
    return res.status(401).json({ error: "Missing register data" });

  newUser.password = await bcrypt.hash(newUser.password, 10);

  try {
    const createdUser = await User.create(newUser);

    res.status(201).json(createdUser);
  } catch {
    next(res.status(500).json({ error: "Internal server error" }));
  }
});

export default router;
