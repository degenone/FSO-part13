const userRouter = require('express').Router();
require('express-async-errors');
const bcrypt = require('bcrypt');

const { User, Blog } = require('../models');
const { getToken } = require('../utils/middleware');

userRouter.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] },
        },
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
        return res.status(404).json({ error: 'user not found' });
    }
    if (user.id !== req.decodedToken.id) {
        return res.status(403).json({ error: 'permission denied' });
    }
    user.username = usernameUpdate;
    await user.save();
    res.json({ name: user.name, username: user.username });
});

userRouter.get('/:id', async (req, res) => {
    const where = {};
    const { unread } = req.query;
    if (unread) {
        where.unread = unread === 'true';
    }
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Blog,
            as: 'readings',
            through: { attributes: ['id', 'unread'], where },
            attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        },
        attributes: ['name', 'username'],
    });
    if (user) {
        return res.json(user);
    }
    res.status(404).json({ error: 'user not found' });
});

module.exports = userRouter;
