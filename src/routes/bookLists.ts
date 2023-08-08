import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import * as Interfaces from '../interfaces/interfaces';
import Booklist from '../models/bookList';

const router = Router();

const essaysDir = './public/media';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, essaysDir);
  },
  filename: function (req, file, cb) {
    const [fileName, extension] = file.originalname.split('.');
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res, next) => {
  try {
    const bookLists = await Booklist.find().sort({ createdAt: -1 });

    res.status(200).json(bookLists);
  } catch (error) {
    next(res.status(500).json({ error: 'Internal server error' }));
  }
});

router.post('/', upload.single('essay'), async (req, res, next) => {
//   const newEssay = JSON.parse(req.body.data) as Interfaces.Essay;

//   const fileName = req.file?.filename;
//   newEssay.url = fileName ? fileName : '';
//   try {
//     const essay = await Essay.create(newEssay);
//     res.status(200).json(essay);
//   } catch (error) {
//     next(res.status(500).json({ error: 'Internal server error' }));
//   }
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
