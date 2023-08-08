import mongoose from "mongoose";
import { IBook } from "../interfaces/interfaces";

const bookSchema: mongoose.Schema<IBook> = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    href: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true,
        default: ''
    }
}, { timestamps: true }
)

const Book = mongoose.model<IBook & mongoose.Document>("Book", bookSchema);

export default Book;