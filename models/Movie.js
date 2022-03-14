const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: { type: Number, required: true },
    rating: { type: Number },
    comment: { type: String }
});

module.exports = model('Movie', schema)