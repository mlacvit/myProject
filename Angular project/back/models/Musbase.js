const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusSchema = new Schema({

  artist: {
    type: String,
    required: true
  },
  description: String,

  image: String
});

const MusBase = mongoose.model('Musbase', MusSchema);

module.exports = MusBase;