const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL);
const { Umzug, SequelizeStorage } = require('umzug');

const migrationConfig = {
    migrations: { glob: 'migrations/*.js' },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logget: console,
};

const runMigrations = async () => {
    const migrator = new Umzug(migrationConfig);
    const migrations = await migrator.up();
    if (migrations.length > 0) {
        console.log(
            'Added migrations:',
            migrations.map((m) => m.name)
        );
    } else {
        console.log('No migrations applied.');
    }
};

const rollbackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConfig);
    await migrator.down();
};

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
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
    rollbackMigration,
};
