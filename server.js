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

//cors for angular
const corsOptions = {
    origin: 'http://localhost:3000/blog',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

const postRouter = require('./BackEnd/routes/post.route');
const app = express();

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

// basic secure
app.use(helmet())

// Post aPI route, home page
app.use('/blog', postRouter)

// Start server
/* const server = https.createServer(httpsOptions, app)
server.listen(3000, function () {
  console.log("server running at https://localhost:3000/")
}); */

app.listen('3000');
app.use(cors(corsOptions));