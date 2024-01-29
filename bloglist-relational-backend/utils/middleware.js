const getSequelizeErrorMessages = (error) =>
    error.errors.map((e) => e.message).join(', ');

const errorHandler = (error, req, res, next) => {
    console.log('e.name', error.name);
    if (error.name === 'SequelizeValidationError') {
        return res
            .status(400)
            .json({ error: getSequelizeErrorMessages(error) });
    } else if (error.name === 'SequelizeDatabaseError') {
        const message = `invalid parameter(s): ${error.parameters.join(', ')}`;
        return res.status(400).json({ error: message });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
        return res
            .status(400)
            .json({ error: getSequelizeErrorMessages(error) });
    }
    next(error);
};

module.exports = {
    errorHandler,
};
