const blogController = require('../controllers/blog.controller')
const bloggerController = require('../controllers/blogger.controller')
const express = require('express')
const blogRouter = express.Router()
const bloggerRouter = express.Router()

blogRouter.route('/')
  .get(blogController.list)
  .post(blogController.create);

blogRouter.route('/:id')
  .get(blogController.find)
  .put(blogController.update)
  .delete(blogController.remove);

/* GET user page. */
blogRouter.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Index'
  });
});
bloggerRouter.route('/')
  .get(blogController.list)
  .post(blogController.create);

bloggerRouter.route('/:id')
  .get(blogController.find)
  .put(blogController.update)
  .delete(blogController.remove);

/* GET blogger page. */
bloggerRouter.get('/', function (req, res, next) {
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

module.exports = blogRouter;
module.exports = bloggerRouter;