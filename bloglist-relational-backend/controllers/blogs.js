const blogRouter = require('express').Router();
require('express-async-errors');
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { getToken } = require('../utils/middleware');

const getBlogByPk = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
        return res.status(404).json({ error: 'blog not found' });
    }
    next();
};

blogRouter.get('/', async (req, res) => {
    const where = {};
    const { search } = req.query;
    if (search) {
        where.title = {
            [Op.iLike]: `%${search}%`,
        };
    }
    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: ['id', 'name', 'username'],
        },
        attributes: { exclude: ['userId'] },
        where,
    });
    res.json(blogs);
});

blogRouter.post('/', getToken, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
});

blogRouter.delete('/:id', getBlogByPk, getToken, async (req, res) => {
    if (req.blog.userId !== req.decodedToken.id) {
        return res.status(403).json({ error: 'permission denied' });
    }
    await req.blog.destroy();
    res.status(204).end();
});

blogRouter.put('/:id', getBlogByPk, async (req, res) => {
    const { likes } = req.body;
    if (likes < 0) {
        return res
            .status(400)
            .json({ error: 'blog.likes cannot be less than 0' });
    }
    req.blog.likes = likes;
    await req.blog.save();
    res.json(req.blog);
});

module.exports = blogRouter;
