import mongoose from "mongoose";
import { Essay } from "../interfaces/interfaces";

const postSchema: mongoose.Schema<Essay> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    openCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Essay = mongoose.model<Essay & mongoose.Document>("Essay", postSchema);

export default Essay;
