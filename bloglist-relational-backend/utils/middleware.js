const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');
const { ActiveSession, User } = require('../models');

const getSequelizeErrorMessages = (error) =>
    error.errors.map((e) => e.message).join(', ');

const errorHandler = (error, req, res, next) => {
    console.log('error.name', error.name);
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
    } else if (error.name === 'TokenExpiredError') {
        return response.status(400).json({ error: 'token expired' });
    }
    next(error);
};

const moreThanHourAgo = (date) => date < Date.now() - 1000 * 60 * 60;

const userIsDisabled = async (id) => {
    const user = await User.findByPk(id);
    return user.disabled;
};

const getToken = async (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(auth.substring(7), SECRET);
            if (await userIsDisabled(req.decodedToken.id)) {
                return res.status(401).json({
                    error: 'account disabled, please contact an admin',
                });
            }
            const session = await ActiveSession.findOne({
                where: {
                    userId: req.decodedToken.id,
                },
            });
            if (!session || moreThanHourAgo(session.loggedInAt)) {
                return res.status(400).json({ error: 'expired token' });
            }
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
