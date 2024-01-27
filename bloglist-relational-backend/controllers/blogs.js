const blogRouter = require('express').Router();
require('express-async-errors');

const Blog = require('../models/Blog');

const getBlogByPk = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
        return res.status(404).end();
    }
    next();
};

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
    const blog = await Blog.create(req.body);
    res.json(blog);
});

blogRouter.delete('/:id', getBlogByPk, async (req, res) => {
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
