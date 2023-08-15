import { Request } from "express";
import mongoose, { Document } from "mongoose";

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
  title: string;
  description: string;
  url: string;
  openCount: number;
  createdAt: Date;
}

export interface InstagramPostExtended {
  shortcode_media: {
    id: string;
    shortcode: string;
    display_url: string;
    edge_media_to_caption: {
      edges: InstagramPostText[];
    };
    edge_sidecar_to_children: {
      edges: InstagramPostPhoto[];
    };
    taken_at_timestamp: string;
  };
}

export interface InstagramPostText {
  node: {
    created_at: string;
    text: string;
  };
}

export interface InstagramPostPhoto {
  node: {
    id: string;
    display_url: string;
  };
}

export interface InstagramFeed {
  count: number;
  page_info: {
    has_next_page: boolean;
    end_cursor: string;
  };
  edges: InstagramPost[];
}

export interface InstagramPost {
  node: {
    id: string;
    shortcode: string;
  };
}

export interface IBook {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: string;
  description?: string;
  href: string;
  photoUrl: string;
}

export interface IBookList {
  _id: mongoose.Types.ObjectId;
  title: string;
  url: string;
  description: string;
  photoUrl: string;
  isHidden: boolean;
  books: mongoose.Types.ObjectId[];
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
