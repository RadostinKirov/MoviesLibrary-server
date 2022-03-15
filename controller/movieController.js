const bodyParser = require('body-parser');
const storageMMiddleware = require('../middleware/storage')


module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(storageMMiddleware());
    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', '*')
            // .append('Access-Control-Allow-Credentials', true)
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
        console.log('rating request received!');
        const movieInfo = req.body;
        try {
            const allRatings = await req.storage.getAllRatings();
            const movieExist = allRatings.find(x => x.id == movieInfo.id);

            if (movieExist) {
                console.log('Movie exist!');
            } else {
                const movie = await req.storage.createMovie(movieInfo);
                res.status(200).send(movieInfo);
            }

        } catch (err) {
            console.log(err)
        }
    });

    app.get('/ratingById/:id', async (req, res) => {
        const id = req.params.id;
        let rating = 0;

        console.log(id)
        try {
            console.log('ratings entered')
            await req.storage.getAllRatings()
                .then(res => {
                    const movieExist = res.find(x => x.id == id);

                    if (movieExist) {
                        console.log('movieExist -> ', movieExist)
                        rating = movieExist.rating;
                        console.log(rating);
                        console.log('check');

                    } else {
                        rating = 0;
                    }
               
                })
                res.status(200).send(rating.toString());

        } catch (err) {
            console.log(err)
            console.log('check3')

        }

    })

}
