const express = require('express');
const app = express();
const port = 8000;
const mysql = require('./mysql');
const cors = require('cors');
const news_go = require('./app/news_go');
const comments = require('./app/comments');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/news_go/', news_go);
app.use('/comments/', comments);

mysql.connect().catch();

app.listen(port, () => console.log(`server started on ${port} port!`));