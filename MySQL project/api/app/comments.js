const express = require('express');
const router = express.Router();
const dataBase = require("../dataBase");

router.get('/', async (req, res) => {
    const [comments] = await dataBase.getItemDataBase('comments');
    res.send(comments);
});

router.post('/', async (req, res) => {
    if (!req.body.author || !req.body.news_id || !req.body.comment) {
        res.status(400).send({error: 'not valid'});
    }

    const comment = {
        author: req.body.author,
        news_id: req.body.news_id,
        comment: req.body.comment
    };
    console.log(comment)
    await dataBase.postItemDataBase('comments', comment);

    res.send('comment created!');
});

router.delete('/:id', async (req, res) => {
    await dataBase.deleteItemDataBase('comments', req.params.id).catch(e => console.error(e));
    res.send('Delete comment!');
});

module.exports = router;