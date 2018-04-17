const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./BackEnd/config/database')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const https = require('https');
const cors = require('cors')

const blogRouter = require('./BackEnd/routes/blog.route');
const bloggerRouter = require('./BackEnd/routes/blogger.route');
const app = express();

//cors for angular
const corsOptions = {
    origin: 'http://localhost:3000/blog',
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

app.use(bodyParser.urlencoded({
    extended: false
}))

// Parse application/json
app.use(bodyParser.json())

// Minden kérés loggolása
app.use(morgan('dev', {
    stream: fs.createWriteStream('./access.log', {
        flags: 'a'
    })
}))


//app.use('/', express.static(__dirname + 'node_modules'))

// basic secure
app.use(helmet())

// Post aPI route, home page
app.use('/blog', blogRouter)
app.use('/blogger', bloggerRouter)

// Start server
/* const server = https.createServer(httpsOptions, app)
server.listen(3000, function () {
  console.log("server running at https://localhost:3000/")
}); */

app.listen('3000');
app.use(cors(corsOptions));