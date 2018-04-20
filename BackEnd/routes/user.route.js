const passport = require('passport');
const userRouter = require('express').Router();
const User = require('../controllers/user.controller');

userRouter.get('/', User.getUser);
userRouter.get('/getAll', User.getAll);
userRouter.get('/getOne/:id', User.getOne);
userRouter.delete('/remove/:id', User.remove);
userRouter.put('/update/:id', User.update);
userRouter.post('/register', User.register);
userRouter.post('/login', passport.authenticate('local'), User.login);
userRouter.get('/logout', User.logout);

module.exports = userRouter;