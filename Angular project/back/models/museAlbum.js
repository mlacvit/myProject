const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Musbase',
    },
    year: String,
    image: String
});

const Album = mongoose.model('album', MusSchema);

module.exports = Album;