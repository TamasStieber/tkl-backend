import { Request } from 'express';
import mongoose, { Document } from 'mongoose';

export interface Post {
  _id: mongoose.Types.ObjectId;
  url: string;
  createdAt: Date;
}