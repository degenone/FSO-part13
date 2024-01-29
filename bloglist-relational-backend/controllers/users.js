const userRouter = require('express').Router();
require('express-async-errors');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const { getToken } = require('../utils/middleware');

userRouter.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    res.json(users);
});

userRouter.post('/', async (req, res) => {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        username,
        password: hashedPassword,
    });
    res.json({ name: user.name, username: user.username });
});

userRouter.put('/:username', getToken, async (req, res) => {
    const { usernameUpdate } = req.body;
    const user = await User.findOne({
        where: {
            username: req.params.username,
        },
    });
    if (!user) {
        return res.status(404).end();
    }
    if (user.id !== req.decodedToken.id) {
        return res.status(403).end();
    }
    user.username = usernameUpdate;
    await user.save();
    res.json({ name: user.name, username: user.username });
});

module.exports = userRouter;
