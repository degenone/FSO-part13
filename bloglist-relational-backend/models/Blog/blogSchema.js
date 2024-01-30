const { DataTypes } = require('sequelize');

const blogSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: { type: DataTypes.STRING },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            isValidYear(value) {
                const currentYear = new Date().getFullYear();
                const year = parseInt(value);
                if (year < 1991 || year > currentYear) {
                    throw new Error(
                        `blog.year must be between 1991 and ${currentYear}.`
                    );
                }
            },
        },
    },
};

module.exports = blogSchema;
