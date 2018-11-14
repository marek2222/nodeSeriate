const express = require('express');
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// const { check, validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');

const flash = require('connect-flash');
const session = require('express-session');
const secret = require('./config/secret');  
const sql = require('seriate');
sql.setDefaultConfig(secret);


// Init app
const app = express();
 
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public folder: to images, Css, files
app.use(express.static(path.join(__dirname, 'public')));
 
// Body Parser Middleware - To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser. body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express Session Middleware
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    //,cookie: { secure: true }
}));
  
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
  
// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));


//Home route
app.get('/', function(req, res){
    sql.execute({
        query: sql.fromFile('./sql/artykuly')
    }).then( function(results){
        res.render('index', {
            tytul:'Artykuły', 
            artykuly: results
        });
    }, function (err){
        console.log ('Coś się stało:', err);
    });
}); 

// Route files
let artykuly = require('./routes/artykuly');
app.use('/artykuly', artykuly);

/// Start server
app.listen(port, function(){
    console.log('Example app listening on port 3000!');
});
