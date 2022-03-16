const bodyParser = require('body-parser');
const storageMMiddleware = require('../middleware/storage');



module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(storageMMiddleware());
    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Headers', '*')
            .append('Access-Control-Allow-Headers', 'content-type')

        next();
    });

    app.get('/favorites', (req, res) => {
        const params = req.params;
        console.log('GET request received to /favorites');
        console.log(params);

        res.send('GET request received to /favorites')
    });

    app.post('/create', async (req, res) => {
        console.log('create request received!');
        console.log(req.body);
        const movieInfo = req.body;
        try {
            console.log('data->', movieInfo)
            const movie = await req.storage.createMovie(movieInfo);
            res.status(200).send(movie);
        } catch (err) {
            console.log(err)


        }


        res.send('GET request received to /create')

    });

    app.get('/rating', async (req, res) => {
        console.log('get rating received')
        try {
            const allRatings = await req.storage.getAllRatings();
            return allRatings;
        } catch (err) {
            console.log(err);
        }

    })

    app.post('/rating', async (req, res) => {

        const movieInfo = req.body;
        try {
            const allRatings = await req.storage.getAllReviews();
            const movieExist = allRatings.find(x => x._id == movieInfo._id);

            if (movieExist) {
                const movie = await req.storage.editReviewByMovieId(req.body);
                res.status(200).send(movie);
            } else {
                const movie = await req.storage.createMovie(movieInfo);
                res.status(200).send(movieInfo);
            }

        } catch (err) {
            console.log(err)
        }
    });

    app.get('/reviewById/:id', async (req, res) => {
        const id = req.params.id;
        let movieExist = null;

        try {
            await req.storage.getAllReviews()
                .then(res => {
                    movieExist = res.find(x => x._id == id);
                    if (movieExist) {
                    } else {
                        movieExist = null;
                    }
                })
            movieExist ? '' : movieExist = '0';
            res.status(200).send(movieExist);

        } catch (err) {
            console.log(err)
        }

    });

    app.post('/comment', async (req, res) => {
        const movieInfo = req.body;
        console.log('/comment entred')
        try {
            const allReviews = await req.storage.getAllReviews();
            const movieExist = allReviews.find(x => x._id == movieInfo._id);
            console.log('all reviews -> ', allReviews)
            console.log('movie exist -> ', movieExist)
            if (movieExist) {

                const movie = await req.storage.editReviewByMovieId(req.body);
                console.log('movie result -> ', movie)
                res.status(200).send(movie);
            } else {
                const movie = await req.storage.createMovie(movieInfo);
                res.status(200).send(movieInfo);
            }

        } catch (err) {
            console.log(err)
        }
    })

}
