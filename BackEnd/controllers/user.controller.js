const User = require('../models/user');

module.exports = {

    //getAll()
    getAll: (req, res) => {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err)
            }
            res.json(user)
        })
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
        if (req.body._id) {
            delete req.body._id;
        }
        User.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                return res.status(500).send(err);
            })
        /*       req.body.updatedAt = new Date().toDateString();
              User.findByIdAndUpdate(req.params._id, req.body, (err, post) => {
                  if (err) {
                      res.send(err)
                      console.log(err)
                  }
                  res.json(post)
              }) */
    },

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
        //res.redirect('localhost:4200/blog')
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/')
    }


}