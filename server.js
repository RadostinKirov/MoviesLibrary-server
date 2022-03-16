const express = require('express');
const { PORT } = require('./config');
const routesConfig = require('./Controller/movieController');
const dataBaseConfig = require('./config/database');
start();

async function start() {
    const app = express();
    routesConfig(app);
    await dataBaseConfig(app);

    app.get('/', (req, res) => res.send('It works!'));
    
    app.listen(PORT, () => {
        console.log(`Application started at http://localhost:${PORT}`)
    });

};
