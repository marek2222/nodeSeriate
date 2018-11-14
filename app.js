const express = require('express');
const port = 3000;
const path = require('path');
 
// Init app
const app = express();
 
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 
//Home route
app.get('/', function(req, res){
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Brad Traversy',
            body: 'This is article one'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'John Doe',
            body: 'This is article two'
        },
        {
            id: 3,
            title: 'Article Three',
            author: 'Brad Traversy',
            body: 'This is article three'
        },
    ];
    res.render('index', {
        title: 'Articles',
        articles: articles
    });
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
