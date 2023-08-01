import { Request } from 'express';
import mongoose, { Document } from 'mongoose';

export interface Post {
  _id: mongoose.Types.ObjectId;
  url: string;
  createdAt: Date;
}

export interface InstagramFeed {
  count: number;
  edges: InstagramPost[];
}

export interface InstagramPost {
  node: {
    id: string;
    shortcode: string;
  };
}

export interface Essay {
  _id: mongoose.Types.ObjectId;
  title: string,
  description: string;
  url: string;
  openCount: number;
  createdAt: Date;
}