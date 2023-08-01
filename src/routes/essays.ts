import { Router } from 'express';
import Essay from '../models/essay';
import multer from 'multer';
import fs from 'fs';
import * as Interfaces from '../interfaces/interfaces';

const router = Router();

const essaysDir = './public/essays';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, essaysDir);
  },
  filename: function (req, file, cb) {
    const [fileName, extension] = file.originalname.split('.')
    const uniqueFileName = fileName + '-' + Date.now() + '.' + extension
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res, next) => {
  try {
    const essays = await Essay.find().sort({createdAt: -1})

    res.status(200).json(essays)
  } catch (error) {
    next(res.status(500).json({ error: 'Internal server error' }));
  }
});

router.post('/', upload.single('essay'), async (req, res, next) => {
    const newEssay = JSON.parse(req.body.data) as Interfaces.Essay;

    const fileName = req.file?.filename;
    newEssay.url = fileName ? 'essays/' + fileName : '';
    try {
      const essay = await Essay.create(newEssay)
  
      res.status(200).json(essay)
    } catch (error) {
      next(res.status(500).json({ error: 'Internal server error' }));
    }
  });

router.put('/:id', async (req, res, next) => {
    try {
      const essays = await Essay.find().sort({createdAt: -1})
  
      res.status(200).json(essays)
    } catch (error) {
      next(res.status(500).json({ error: 'Internal server error' }));
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const essayToDelete = await Essay.findByIdAndDelete(req.params.id)
  
      res.status(200).json(essayToDelete)
    } catch (error) {
      next(res.status(500).json({ error: 'Internal server error' }));
    }
  });

export default router