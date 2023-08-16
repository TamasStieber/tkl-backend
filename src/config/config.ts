import * as dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "";

export const PORT = process.env.PORT || 3000;

export const MONGO_USER = process.env.MONGO_USER || "";
export const MONGO_PW = process.env.MONGO_PW || "";
export const MONGO_URI = process.env.MONGO_URI || "";

export const MONGO_PATH =
  `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_URI}` || "";

export const JWT_SECRET = process.env.JWT_SECRET || "";

export const REGISTER_KEY = process.env.REGISTER_KEY || "";
