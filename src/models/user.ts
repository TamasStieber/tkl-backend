import mongoose from "mongoose";
import { IUser } from "../interfaces/interfaces";

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
