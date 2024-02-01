const loginRouter = require('express').Router();
require('express-async-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, ActiveSession } = require('../models');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username: username,
        },
    });
    if (!user) {
        res.status(400).json({ error: 'invalid login.' });
    }
    if (user.disabled) {
        return res.status(401).json({
            error: 'account disabled, please contact an admin',
        });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        res.status(400).json({ error: 'invalid login.' });
    }
    await ActiveSession.upsert({ userId: user.id, loggedInAt: new Date() });
    const token = jwt.sign(
        {
            username: user.username,
            id: user.id,
        },
        SECRET,
        { expiresIn: 60 * 60 }
    );
    res.json({
        token,
        username: user.username,
        name: user.name,
    });
});

module.exports = loginRouter;
