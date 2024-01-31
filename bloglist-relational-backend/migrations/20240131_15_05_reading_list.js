const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('reading_list', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                reference: {
                    model: 'users',
                    key: 'id',
                },
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                reference: {
                    model: 'blogs',
                    key: 'id',
                },
            },
            unread: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('reading_list');
    },
};
