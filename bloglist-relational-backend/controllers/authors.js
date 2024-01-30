const authorsRouter = require('express').Router();
require('express-async-errors');

const { Blog } = require('../models');
const { sequelize } = require('../utils/db');

authorsRouter.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', 1), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        ],
        group: 'author',
        order: [['likes', 'DESC']],
    });
    res.json(authors);
});

module.exports = authorsRouter;
