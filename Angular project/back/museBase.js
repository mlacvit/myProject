const express = require('express');
const config = require('./config');
const path = require('path');
const MusBase = require("./models/Musbase");

const { nanoid } = require('nanoid');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    const query = {};
    const sort = {};

    if (req.query.filter === 'image') {
      query.image = {$ne: null};
    }

    if (req.query.orderBy === 'date' && req.query.direction === 'desc') {
      sort._id = -1;
    }

    const musBase = await MusBase.find(query).sort(sort);

    return res.send(musBase);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const musBase = await MusBase.findById(req.params.id);

    if (!musBase) {
      return res.status(404).send({message: 'Not found'});
    }

    return res.send(musBase);
  } catch (e) {
    next(e);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.artist) {
      return res.status(400).send({message: 'artist are required'});
    }

    const musData = {
      artist: req.body.artist,
      description: req.body.description,
      image: null,
    };

    if (req.file) {
      musData.image = req.file.filename;
    }

    const musBase = new MusBase(musData);

    await musBase.save();

    return res.send({message: 'Created new product', id: musBase._id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;