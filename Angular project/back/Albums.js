const express = require('express');
const config = require('./config');
const path = require('path');
const MusAlbum = require("./models/museAlbum");
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
        if (req.query.artist){
            return res.send(await MusBase.findById(req.query.artist));
        }
        const albums = await MusAlbum.find();
        return res.send(albums);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const MusAlbums = await MusAlbum.findById(req.params.id);

        if (!MusAlbums) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(MusAlbums);
    } catch (e) {
        next(e);
    }
});

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'artist & title are required'});
        }

        const musData = {
            title: req.body.title,
            artist: req.body.artist,
            year: req.body.year,
            image: null,
        };

        if (req.file) {
            musData.image = req.file.filename;
        }

        const MusAlbums = new MusAlbum(musData);

        await MusAlbums.save();

        return res.send({message: 'Created new product', id: MusAlbums._id});
    } catch (e) {
        next(e);
    }
});

module.exports = router;