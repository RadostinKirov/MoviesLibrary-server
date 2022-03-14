const movie = require('../services/movie');

module.exports = () => (req, res, next) => {
       req.storage = {
        ...movie
    };

    next();
};