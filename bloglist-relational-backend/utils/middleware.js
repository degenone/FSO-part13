const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');

const getSequelizeErrorMessages = (error) =>
    error.errors.map((e) => e.message).join(', ');

const errorHandler = (error, req, res, next) => {
    console.log('e.name', error.name);
    if (error.name === 'SequelizeValidationError') {
        return res
            .status(400)
            .json({ error: getSequelizeErrorMessages(error) });
    } else if (error.name === 'SequelizeDatabaseError') {
        return res.status(400).json({ error });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
        return res
            .status(400)
            .json({ error: getSequelizeErrorMessages(error) });
    }
    next(error);
};

const getToken = async (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(auth.substring(7), SECRET);
        } catch (error) {
            return res.status(400).json({ error: 'invalid token' });
        }
    } else {
        return res.status(400).json({ error: 'token missing' });
    }
    next();
};

module.exports = {
    errorHandler,
    getToken,
};
