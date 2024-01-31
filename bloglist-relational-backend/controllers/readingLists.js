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

readingListRouter.put('/:id', getToken, async (req, res) => {
    const { unread } = req.body;
    if (unread === undefined) {
        return res.status(400).json({ error: 'missing field: unread' });
    }
    const listItem = await ReadingList.findByPk(req.params.id);
    if (listItem.userId !== req.decodedToken.id) {
        return res.status(401).json({ error: 'permission denied' });
    }
    if (listItem) {
        listItem.unread = unread;
        await listItem.save();
        return res.json(listItem);
    }
    res.status(404).json({ error: 'reading list item not found' });
});

module.exports = readingListRouter;
