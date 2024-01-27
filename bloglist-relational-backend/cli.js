require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init(
    {
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
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'blog',
    }
);

const main = async () => {
    const blogs = await Blog.findAll();
    blogs.forEach((blog) =>
        console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
    );
};

main();
