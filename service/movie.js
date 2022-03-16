
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

async function getMovieById(movieInfo) {
    const movie = await Movie.findById(movieInfo.id).lean();
    return movie;
}

async function editReviewByMovieId(movieInfo) {
    try {
        
        let movie = await Movie.findById(movieInfo._id);
        movie.rating ? movie.rating = movieInfo.rating : '';
        movie.comment ? movie.comment = movieInfo.comment : '';
        return movie.save();
       
    }


    catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllRatings,
    createMovie,
    getMovieById,
    editReviewByMovieId
};
