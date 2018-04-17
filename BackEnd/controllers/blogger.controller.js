const Blogger = require('../models/blogger.model')

module.exports = {
  //getAll()
  list: (req, res) => {
    Blogger.find({}, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  find: (req, res) => {
    Blogger.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  create: (req, res) => {
    Blogger.create(req.body, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  update: (req, res) => {
    req.body.updatedAt = new Date().toDateString();
    Blogger.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  },

  remove: (req, res) => {
    Blogger.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json(post)
    })
  }
}