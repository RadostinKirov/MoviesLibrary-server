const Movie = require('../models/Movie');

async function createMovi(dataMovie) {
    try {
        console.log(dataMovie)
        const movie = new Movie(dataMovie);
        await movie.save();
        return movie;
    } catch (err) {
        throw new Error(err);
    }
}