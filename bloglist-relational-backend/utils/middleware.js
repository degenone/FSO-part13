const errorHandler = (error, req, res, next) => {
    console.log('e.name', error.name);
    if (error.name === 'SequelizeValidationError') {
        const message = error.errors.map((e) => e.message).join(', ');
        return res.status(400).json({ error: message });
    } else if (error.name === 'SequelizeDatabaseError') {
        const message = `invalid parameter: ${error.parameters[0]}`;
        return res.status(400).json({ error: message });
    }
    next(error);
};

module.exports = {
    errorHandler,
};
