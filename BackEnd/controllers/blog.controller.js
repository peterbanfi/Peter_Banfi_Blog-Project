const Blog = require('../models/blog.model')

module.exports = {
  //getAll()
  list: (req, res) => {
    Blog.find({}, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  find: (req, res) => {
    Blog.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  create: (req, res) => {
    Blog.create(req.body, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  update: (req, res) => {
    req.body.updatedAt = new Date().toDateString();
    Blog.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  remove: (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  }
}