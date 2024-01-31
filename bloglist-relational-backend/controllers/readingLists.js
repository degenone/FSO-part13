const readingListRouter = require('express').Router();
require('express-async-errors');

const { ReadingList } = require('../models');
const { getToken } = require('../utils/middleware');

readingListRouter.post('/', getToken, async (req, res) => {
    const { blogId } = req.body;
    const listItem = await ReadingList.create({
        blogId,
        userId: req.decodedToken.id,
    });
    res.json(listItem);
});

module.exports = readingListRouter;
