const express = require('express');

start();

async function start() {
    const app = express();

  
    app.get('/', (req, res) => res.send('It works!'));
    app.listen(3030, () => {
        console.log(`Application started at http://localhost:3030`)
    });

};