const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        blogposts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        posts: {
            type: String,
            default: 'User has no any posts yet.'
        }
    }, {
        timestamps: true
    }

)

/* const blogSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogposts'
    },
    title: String,
    content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogposts'
    }]
}); */

//const Users = mongoose.model('Users', userSchema);


userSchema.plugin(passportLocalMongoose, {
    maxAttempts: 5,
    hashField: 'password'
});

module.exports = mongoose.model('User', userSchema)
//module.exports = mongoose.model('Blogposts', blogSchema)