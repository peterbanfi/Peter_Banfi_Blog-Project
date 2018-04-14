const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./BackEnd/config/database')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const https = require('https');
//const http = require('http');

const postRouter = require('./BackEnd/routes/post.route')
const app = express()


// Connect to MongoDB
mongoose.connect(db.uri, db.options).then(
    () => {
        console.log('MongoDB connected.')
    },
    err => {
        console.error('MongoDB error.:' + err)
    }
)

// Get view File Path
/*function view (path) {
  return __dirname + '/views/' + path
}*/

// Parse application/x-www-form-urlencoded
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

// Start Browser-Sync

//  if (app.get('env') === 'development') {
//  const browserSync = require('browser-sync')
//    const config = {
//  files: ['views/**/*.html'],
//    logLevel: 'info',
//      logSnippet: false,
//  reloadDelay: 3000,
//    reloadOnRestart: true
//    }
//const bs = browserSync(config)
//  app.use(require('connect-browser-sync')(bs))
//  }

// Post aPI route, home page
app.use('/blog', postRouter)

// use https cert - git bash-t használj
// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
/* const httpsOptions = {
  key: fs.readFileSync('./sslcert/key.pem', 'utf8'),
  cert: fs.readFileSync('./sslcert/cert.pem', 'utf8'),
  passphrase: 'YR_noderestapi_01'
}; */

// Start server
/* const server = https.createServer(httpsOptions, app)
server.listen(3000, function () {
  console.log("server running at https://localhost:3000/")
}); */

app.listen('3000');