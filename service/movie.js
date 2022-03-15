const Movie = require('../models/Movie');


async function getAllRatings() {
    console.log('inService');
    const movies = await Movie.find({}).lean();

    return movies

}

async function createMovie(movieInfo) {
    try {
        console.log(movieInfo)
        const movie = new Movie(movieInfo);
        await movie.save();
        return movie;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getAllRatings,
    createMovie,
};
