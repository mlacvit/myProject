const mysql = require('./mysql');

module.exports = {
    async getItemDataBase(essence) {
        try {
            return await mysql.getConnection().query(`SELECT * FROM ??`, [essence]);
        }
        catch (e) {
            console.error(e.message)
        }
    },

    async getOneItemDataBase(essence, id) {
        try {
            return await mysql.getConnection().query(
                `SELECT * FROM ?? WHERE id = ?`,
                [essence, id]
            );
        } catch (e) {
            console.error(e);
        }
    },

    async postItemDataBase(essence, item) {
        try {
            if (essence === 'news_go') {
                return await mysql.getConnection().query(
                    `INSERT INTO ?? (title, content, image, date) 
                     VALUES (?, ?, ?, ?)`,
                    [
                        essence,
                        item.title,
                        item.content,
                        item.image,
                        item.date,
                    ]
                );
            }
            if (essence === 'comments') {
                return await mysql.getConnection().query(
                    `INSERT INTO ?? (author, news_id, comment)
                     VALUES (?, ?, ?)`,
                    [
                        essence,
                        item.author,
                        item.news_id,
                        item.comment,
                    ]
                );
            }
        } catch (e) {
            console.error(e.message);
        }
    },

    async deleteItemDataBase(essence, id) {
        try {
            await mysql.getConnection().query(
                `DELETE FROM ?? WHERE id = ?`,
                [essence, id]
            );
        } catch (e) {
            console.error(e);
        }
    },
};