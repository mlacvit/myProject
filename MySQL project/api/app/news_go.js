const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const dataBase = require('../dataBase');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const [news] = await dataBase.getItemDataBase('news_go');
    res.send(news.map(nws => ({id: nws.id, title: nws.title, image: nws.image, date: nws.date})));
});

router.get('/:id', async (req, res) => {
    const [news] = await dataBase.getOneItemDataBase('news_go', req.params.id);
    res.send(news[0]);
});

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).send({error: 'not valid'});
    }

    const news = {
        title: req.body.title,
        content: req.body.content,
        image: !req.file ? null : req.file.filename,
        date: new Date().toISOString()
    };

    await dataBase.postItemDataBase('news_go', news);

    res.send('News created!');
});

router.delete('/:id', async (req, res) => {
    await dataBase.deleteItemDataBase('news_go', req.params.id);
    res.send('Delete news!');
});

module.exports = router;