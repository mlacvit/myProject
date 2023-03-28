const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');

const upload = name => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config.uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, nanoid() + path.extname(file.originalname));
        },
    });

    const up = multer({storage});
    return up.single(name);
};

module.exports = upload;