const blogController = require('../controllers/blog.controller')
const express = require('express')
const blogRouter = express.Router()

blogRouter.route('/')
  .get(blogController.list)
  .post(blogController.create);

blogRouter.route('/:id')
  .get(blogController.find)
  .put(blogController.update)
  .delete(blogController.remove);

/* GET home page. */
blogRouter.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Index'
  });
});
blogRouter.get('/profile', function (req, res, next) {
  res.render('profile', {
    title: 'Profile'
  });
});
blogRouter.get('/knowledge', function (req, res, next) {
  res.render('knowledge', {
    title: 'Knowledge Base'
  });
});

module.exports = blogRouter