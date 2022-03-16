const Movie = require('../models/Movie');

async function getAllReviews() {
    const movies = await Movie.find({}).lean();
    return movies

}

async function createMovie(movieInfo) {
    try {
        const movie = new Movie(movieInfo);
        !movieInfo.rating ? movie.rating = 0 : "";
        !movieInfo.comment ? movie.comment = "" : "";
        await movie.save();
        return movie;
    } catch (err) {
        throw new Error(err);
    }
}

async function getMovieById(movieInfo) {
    const movie = await Movie.findById(movieInfo.id).lean();
    return movie;
}

async function editReviewByMovieId(movieInfo) {
    try {

        let movie = await Movie.findById(movieInfo._id);

        if (movie.rating) {
            console.log('has rating')
            movie.rating = movieInfo.rating;
        }
        if (movie.comment) {
            console.log('has comment')
            movie.comment = movieInfo.comment;
        }

        return movie.save();

    }

    catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllReviews,
    createMovie,
    getMovieById,
    editReviewByMovieId
};
