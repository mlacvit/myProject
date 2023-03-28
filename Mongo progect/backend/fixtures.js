const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');
const User = require("./models/User");
const Gallery = require("./models/Gallery");


const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }
    const [admin, user, userka] = await User.create({
        email: 'admin@gmail.com',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
        displayName: 'Admin',
        avatar: 'fixtures/admin.webp'
    }, {
        email: 'user@mail.ru',
        password: 'user',
        token: nanoid(),
        role: 'user',
        displayName: 'User',
        avatar: 'fixtures/user.png'
    }, {
        email: 'maggy@mail.com',
        password: 'maggy',
        token: nanoid(),
        role: 'user',
        displayName: 'Maggy',
        avatar: 'fixtures/userka.png'
    });

    await Gallery.create({
        user: user._id,
        title: 'Classic landscape',
        image: 'fixtures/one.jpeg',
        publish: true,
    }, {
        user: user._id,
        title: 'Nice girl',
        image: 'fixtures/three.jpg',
        publish: true,
    }, {
        user: user._id,
        title: 'Garmony',
        image: 'fixtures/two.jpg',
        publish: true,
    }, {
        user: userka._id,
        title: 'Good cartoon',
        image: 'fixtures/four.jpg',
        publish: false,

    }, {
        user: userka._id,
        title: 'Grete film',
        image: 'fixtures/five.jpg',
        publish: false,
    });

    await mongoose.connection.close();
};

run().catch(console.error);