import mongoose from "mongoose";
import { Post } from "../interfaces/interfaces";

const postSchema: mongoose.Schema<Post> = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<Post & mongoose.Document>("Post", postSchema);

export default Post;
