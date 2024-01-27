const blogRouter = require('express').Router();

const Blog = require('../models/Blog');

const getByPk = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        const message = error.errors.map((e) => e.message).join(', ');
        res.status(400).json({ error: message });
    }
});

blogRouter.delete('/:id', getByPk, async (req, res) => {
    if (req.blog) {
        await req.blog.destroy();
        return res.status(204).end();
    }
    res.status(404).end();
});

blogRouter.put('/:id', getByPk, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes;
        try {
            await req.blog.save();
        } catch (error) {
            return res.status(400).json({ error });
        }
        return res.json(req.blog);
    }
    res.status(404).end();
});

module.exports = blogRouter;
