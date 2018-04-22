const User = require('../models/user');
const Post = require('../models/blogposts');

module.exports = {

    //getAll()
    getAll: (req, res) => {
        User.find({}, (err, user) => {
                if (err) {
                    res.send(err)
                }
                res.json(user)
            })
            .populate('Blogposts')
    },

    getOne: (req, res) => {
        User.findById(req.params.id)
            .then(userFound => {
                if (!userFound) {
                    return res.status(404).end();
                }
                return res.status(200).json(userFound)
            })
            .catch(err => next(err));
    },

    getUser: (req, res) => {
        res.json({
            user: req.user
        })
    },

    register: (req, res, next) => {
        User.register(new User({
            username: req.body.username,
            email: req.body.email
        }), req.body.password, (err) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                success: 'Registration complete.'
            })
            //res.redirect('localhost:4200/home')
        })
    },

    update: (req, res) => {
        req.body.updatedAt = new Date().toLocaleDateString();
        User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
            if (err) {
                res.send(err)
                console.log(err)
            }
            res.json(post)
        })
    },

    /* createPosts: (req, res, next) => {
        Post.createPosts(new Post({
            author: req.body.author,
            title: req.body.title,
            content: req.body.content
        }), req.body.password, (err) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                success: 'Registration complete.'
            })
            //res.redirect('localhost:4200/home')
        })
    }, */


    remove: (req, res) => {
        User.findByIdAndRemove(req.params.id)
            .then(() => {

                res.status(204).end();
            })
            .catch(err => {
                return res.status(200).send(err)
            });
    },

    login: (req, res) => {
        res.json({
            succes: 'Login'
        })
        //.redirect('localhost:4200/blog');
    },

    logout: (req, res) => {
        req.logout();
        res.json({
            succes: 'Logged out!'
        })
        //res.redirect('/')
    }


}