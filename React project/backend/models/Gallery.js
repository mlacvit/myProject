const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema  = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    token: String,

    publish: Boolean
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;