const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
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
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs');
        await queryInterface.dropTable('users');
    },
};
