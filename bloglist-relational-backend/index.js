require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: { type: DataTypes.STRING },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
});
Blog.sync();

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        const message = error.errors.map(e => e.message).join(', ');
        res.status(400).json({ error: message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
        await blog.destroy();
        return res.status(204).end();
    }
    res.status(404).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
