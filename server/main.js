var cool = require('cool-ascii-faces');

var express = require('express');
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var path = require("path");
const http = require('http');
const api = require('./routes/api');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(__dirname + '/../dist'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set our api routes 
app.use('/api', api);

app.use(morgan('dev'));

app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        // normal static file request
        next();
    }
    else {
        // redirect all html requests to `index.html`
        res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
    }
});

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}



const server = http.createServer(app);

server.listen(app.get('port'), function() {
    console.log('Angular2 fullstack listening on port '+app.get('port'));
});

//Models
var models = require("./db/models");
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});