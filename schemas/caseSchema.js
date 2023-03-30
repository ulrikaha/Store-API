const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
    name: {type: String},
    category: {type: String}
});

const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    imgURL: {type: String, required: true},
    tags: [tagSchema]
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;