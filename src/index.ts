import * as config from './config/config';
import express from 'express';
import mongoose from 'mongoose';
// import loginRouter from './routes/login';
import postsRouter from './routes/posts';
import essaysRouter from './routes/essays';
import booksRouter from './routes/books';
import bookListsRouter from './routes/bookLists';
import cors from 'cors';
import morgan from 'morgan';

const server = express();

server.use(cors());
server.use(morgan('tiny'));
server.use(express.json());
server.use(express.static('public'));
// server.use('/login', loginRouter);
server.use('/posts', postsRouter);
server.use('/essays', essaysRouter);
server.use('/books', booksRouter);
server.use('/book-lists', bookListsRouter);

server.use((req, res) => {
  res.status(404).json({ error: 'Not found' }).end();
});

mongoose.set('strictQuery', true);

const main = async () => {
  try {
    await mongoose
      .connect(config.MONGO_PATH)
      .then(() => console.log('Connected to MongoDB'));
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
  server.listen(config.PORT, () =>
    console.log(`Server is listening on ${config.PORT}`)
  );
};

main().catch((error) => console.error(error));
