const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');
    } catch (error) {
        console.log('Connection failed...');
        console.error(error);
        process.exit(1);
    }
    return null;
};

module.exports = {
    sequelize,
    connectToDatabase,
};
