const express = require('express');
const app = express();
const mongoose = require("mongoose");
const config = require('./config');
const musBase = require('./museBase');
const MusAlbums = require('./Albums');
const cors = require('cors');

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/musbase', musBase);
app.use('/album', MusAlbums);

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);
}

app.listen(port, () => {
  console.log('We are live on ' + port);
});

 process.on('exit', async () => {
 await mongoose.disconnect();
})

run().catch(e => console.error(e));