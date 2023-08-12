import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import Booklist from '../models/bookList';
import { IBookList } from '../interfaces/interfaces';
import * as _ from 'lodash';

const router = Router();

const imagesDir = './public/images';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res, next) => {
  try {
    const bookLists = await Booklist.find()
      .sort({ createdAt: -1 })
      .populate({ path: 'books' });

    res.status(200).json(bookLists);
  } catch (error) {
    next(res.status(500).json({ error: 'Internal server error' }));
  }
});

router.post('/', upload.single('photo'), async (req, res, next) => {
  const newBookList = JSON.parse(req.body.data) as IBookList;
  const fileName = req.file?.filename;

  newBookList.url = _.kebabCase(newBookList.title);
  newBookList.photoUrl = fileName;

  try {
    const bookList = await Booklist.create(newBookList);
    res.status(200).json(bookList);
  } catch (error) {
    next(res.status(500).json({ error: 'Internal server error' }));
  }
});

router.put('/:id', async (req, res, next) => {
  //   try {
  //     const essay = await Essay.findByIdAndUpdate(
  //       req.params.id,
  //       { $inc: { openCount: 1 } },
  //       { new: true }
  //     );
  //     res.status(200).json(essay);
  //   } catch (error) {
  //     next(res.status(500).json({ error: 'Internal server error' }));
  //   }
});

router.delete('/:id', async (req, res, next) => {
  //   try {
  //     const essayToDelete = await Essay.findByIdAndDelete(req.params.id);
  //     const fileToDelete = essaysDir + '/' + essayToDelete?.url;
  //     fs.existsSync(fileToDelete) && fs.unlinkSync(fileToDelete);
  //     res.status(200).json(essayToDelete);
  //   } catch (error) {
  //     next(res.status(500).json({ error: 'Internal server error' }));
  //   }
});

export default router;
