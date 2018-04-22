const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogposts'
    },
    title: String,
    content: String
});

const Blogposts = mongoose.model('Blogposts', blogSchema);
module.exports = mongoose.model('Blogposts', blogSchema)