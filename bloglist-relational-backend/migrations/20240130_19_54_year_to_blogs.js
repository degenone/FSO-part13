const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
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
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year');
    },
};
