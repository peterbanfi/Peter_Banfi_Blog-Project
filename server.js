const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./BackEnd/config/database');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rfs = require('rotating-file-stream');

const blogRouter = require('./BackEnd/routes/blog.route');
const bloggerRouter = require('./BackEnd/routes/blogger.route');
const User = require('./BackEnd/models/user.js');
const userRouter = require('./BackEnd/routes/user.route');
const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

//cors for angular
const corsOptions = {
    origin: 'http://localhost:8080/user',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// Connect to MongoDB
mongoose.connect(db.uri, db.options).then(
    () => {
        console.log('MongoDB connected.')
    },
    err => {
        console.error('MongoDB error.:' + err)
    }
)

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//cookie handling
app.use(cookieParser());

//Logging
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory,

})
app.use(morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
}));

// basic secure
app.use(helmet())

//session handling
app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: true,
    saveUninitialized: true
}));

//Passport Auth 
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
//passport.use(Blogposts.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Post aPI route, home page
//User route
app.use('/user', userRouter);
//app.use('/blog', blogRouter)
//app.use('/blogger', bloggerRouter)


app.use(cors());
// start server
app.listen(port);
console.log('The magic is happening on port: ' + port);

//app.listen('3000');
//app.use(cors(corsOptions));