import { Router } from "express";
import * as Interfaces from "../interfaces/interfaces";
import Post from "../models/post";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const allPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ allPosts });
  } catch {
    next(res.status(500).json({ error: "Internal server error" }));
  }
});

router.post("/", async (req, res, next) => {
  const newPost = req.body as Interfaces.Post;

  try {
    const post = await Post.create(newPost);
    res.status(201).json({ post });
  } catch {
    next(res.status(500).json({ error: "Internal server error" }));
  }
});

router.put("/:id", async (req, res) => {
  const update = req.body as Post;

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.status(200).json({ updatedPost });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postToDelete = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ postToDelete });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
