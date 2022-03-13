const movieController = require('../controller/movieController')

module.exports = (app) => {
    app.use('/search', movieController);
    
}