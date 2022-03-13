const express = require('express');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();
    routesConfig(app);
    
    app.get('/', (req, res) => res.send('It works!'));
   
    app.listen(3030, () => {
        console.log(`Application started at http://localhost:3030`)
    });

};
