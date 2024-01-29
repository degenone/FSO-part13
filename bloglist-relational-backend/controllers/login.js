const loginRouter = require('express').Router();
require('express-async-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
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
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        res.status(400).json({ error: 'invalid login.' });
    }
    const token = jwt.sign(
        {
            username: user.username,
            id: user.id,
        },
        SECRET
    );
    res.json({
        token,
        username: user.username,
        name: user.name,
    });
});

module.exports = loginRouter;
