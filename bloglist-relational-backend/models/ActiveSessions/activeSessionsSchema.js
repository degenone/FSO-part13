const { DataTypes } = require('sequelize');

const activeSessionsSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        reference: { model: 'users', key: 'id' },
    },
    loggedInAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
};

module.exports = activeSessionsSchema;
