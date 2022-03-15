const movie = require('../service/movie');

module.exports = () => (req, res, next) => {
       req.storage = {
        ...movie
    };
    next();
};

