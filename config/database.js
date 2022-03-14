const { DB_CONNECTION_STRING } = require('./index');
const mongoose = require('mongoose');

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        console.log('db-connection-string ->', DB_CONNECTION_STRING)
        mongoose.connect(DB_CONNECTION_STRING);

        const db = mongoose.connection;
        db.on('error', (err) => {
            console.error('connection error: ', err);
            reject(err);
        });
        db.once('open', function () {
            console.log('Database ready');
            resolve();
        });
    });
}