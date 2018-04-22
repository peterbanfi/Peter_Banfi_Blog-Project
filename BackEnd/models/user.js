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
        /*      blogposts: {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'Blogpost'
             }, */
        posts: {
            type: String,
            default: 'User has no any posts yet.'
        }
    }, {
        timestamps: true
    }

)

userSchema.plugin(passportLocalMongoose, {
    maxAttempts: 5,
    hashField: 'password'
});

module.exports = mongoose.model('User', userSchema)