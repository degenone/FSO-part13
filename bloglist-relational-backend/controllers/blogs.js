const blogRouter = require('express').Router();

const Blog = require('../models/Blog');

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

blogRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
        await blog.destroy();
        return res.status(204).end();
    }
    res.status(404).end();
});

module.exports = blogRouter;
