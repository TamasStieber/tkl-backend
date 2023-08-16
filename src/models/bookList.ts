import mongoose from 'mongoose';
import { IBookList } from '../interfaces/interfaces';

const bookListSchema: mongoose.Schema<IBookList> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    photoUrl: {
      type: String,
      required: false,
      default: undefined,
    },
    isHidden: {
      type: Boolean,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  { timestamps: true }
);

const Booklist = mongoose.model<IBookList & mongoose.Document>(
  'Booklist',
  bookListSchema
);

export default Booklist;
