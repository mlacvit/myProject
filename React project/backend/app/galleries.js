const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const permit = require("../middleware/permit");
const Gallery = require('../models/Gallery');
const User = require("../models/User");

router.get('/', async (req, res) => {
    const token = req.get('Authorization');
    const user = await User.findOne({token});
    if (req.query.gallery) {
        const galleries = await Gallery
            .find({user: req.query.gallery})
            .select('title image publish user')
            .populate('user');
        return res.send(galleries);
    }
    if (req.query.link) {
        const galleries = await Gallery
            .find({_id: req.query.link, user: user._id, publish: false})
            .select('title image publish user')
            .populate('user');

        return res.send(galleries);
    }
    try {

        if (user !== null) {
            if (user.role === "admin") {
                const galleries = await Gallery
                    .find()
                    .select('title image publish user')
                    .populate('user');
                return res.send(galleries);
            }
            if (user.role === "user") {
                const galleries = await Gallery
                    .find({publish: true})
                    .select('title image publish user')
                    .populate('user');
                return res.send(galleries);
            }
        }
        const galleries = await Gallery
            .find({publish: true})
            .select('title image publish user')
            .populate('user');
        res.send(galleries);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', auth, async (req, res) => {
    const user = req.user;
    try {
        if (req.query.user) {
            const galleries = await Gallery
                .findOne({_id: req.params.id, user: req.query.user})
                .select('title image publish user')
                .populate('user');
            return res.send(galleries);
        }
        if (user !== null) {
            if (user.role === 'user') {
                const gallery = await Gallery
                    .findOne({_id: req.params.id, publish: true})
                    .populate('user');
                if (!gallery) res.status(404).send('gallery not found!');
                return res.send(gallery);
            }

            if (user.role === 'admin') {
                const gallery = await Gallery.findOne({_id: req.params.id}).populate('user');
                if (!gallery) res.status(404).send('gallery not found!');
                return res.send(gallery);
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', [auth, permit('user'), upload('image')], async (req, res) => {
    const user = req.user;

    const {title} = req.body;

    if (!req.body.title) res
        .status(400)
        .send({error: 'Title not valid'});

    const galleryData = {
        user: user._id,
        title,
        image: req.file
            ? 'uploads/' + req.file.filename
            : res.status(400).send({error: 'Image not valid'}),
        publish: false
    };

    try {
        const gallery = new Gallery(galleryData);
        await gallery.save();

        res.send(gallery);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);

        if (!gallery) res.status(404).send({message: 'gallery not found!'});


        const updateGallery = await Gallery
            .findByIdAndUpdate(req.params.id, {publish: true});

        res.send(updateGallery);
    } catch {
        res.sendStatus(500);
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);

        if (!gallery) res.status(404).send({message: 'gallery not found!'});

        await Gallery.findByIdAndDelete(req.params.id);

        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;
