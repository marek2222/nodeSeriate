const express = require('express');
const port = 3000;
const path = require('path');

const bodyParser = require('body-parser');
const secret = require('./config/secret');  
const sql = require('seriate');
sql.setDefaultConfig(secret);
 
// Init app
const app = express();
 
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware - To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser. body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Home route
app.get('/', function(req, res){
    sql.execute({
        query: sql.fromFile("./sql/artykuly")
    }).then( function(results){
        res.render('index', {
            tytul:'Artykuły', 
            artykuly: results
        });
    }, function (err){
        console.log ("Something bad happened:", err);
    });



    // sql.getPlainContext()
	// .step( "readUsers", {
    //     query: sql.fromFile('./sql/baza')
	// 	// optionally you could do this if the
	// 	// above query were in a readUsers.sql file
	// 	// query: sql.fromFile( "readUsers" );
	// })
	// .end( function( sets ){
	// 	// sets has a "readUsers" property
    //     // which contains the results of the query
    //     // console.log(sets[0]);
        
    //     res.render('index', {
    //         tytul:'Artykuły', 
    //         artykuly: sets
    //     });
    // })
	// .error( function( err ){
	// 	console.log( err );
    // });
    
    // sql.execute({
    //     query: sql.fromFile('./sql/baza')
    // }).then( function(results){
    //     agents = results;
    // }, function (err){
    //     console.log ('Something bad happened:', err);
    // });
    // console.log(agents[0])
    // res.render('index', {
    //     title2:'title', 
    //     agents: agents
    // });
});

// Add route
app.get('/articles/add', function(req, res){
    res.render('add_article', {
        title: 'Add Article'
    });
});
 
/// Start server
app.listen(port, function(){
    console.log('Example app listening on port 3000!');
});
