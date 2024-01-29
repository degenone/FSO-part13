const userRouter = require('express').Router();
require('express-async-errors');
const bcrypt = require('bcrypt');

const { User } = require('../models');

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

userRouter.put('/:username', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({
        where: {
            username: req.params.username,
        },
    });
    if (!user) {
        return res.status(404).end();
    }
    user.username = username;
    await user.save();
    res.json({ name: user.name, username: user.username });
});

module.exports = userRouter;
