const logoutRouter = require('express').Router();
require('express-async-errors');

const { ActiveSession } = require('../models');
const { getToken } = require('../utils/middleware');

logoutRouter.post('/', getToken, async (req, res) => {
    const session = await ActiveSession.findOne({
        where: {
            userId: req.decodedToken.id,
        },
    });
    if (session) {
        await session.destroy();
        return res.status(204).end();
    }
    res.status(404).json({ error: 'active session not found' });
});

module.exports = logoutRouter;
