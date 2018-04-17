const bloggerController = require('../controllers/blogger.controller')
const express = require('express')
const bloggerRouter = express.Router()

bloggerRouter.route('/')
  .get(bloggerController.list)
  .post(bloggerController.create);

bloggerRouter.route('/:id')
  .get(bloggerController.find)
  .put(bloggerController.update)
  .delete(bloggerController.remove);

/* GET blogger page. */
bloggerRouter.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Index'
  });
});

module.exports = bloggerRouter;