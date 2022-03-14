
module.exports = (app) => {
    app.get('/favorites', (req, res) => {
        const params = req.params;
        console.log(params);
        res.send('GET request received to /favorites')
    });


    app.post('/create', (req, res) => {
        console.log('create request received!');
        res.send('GET request received to /create')

    });



}
