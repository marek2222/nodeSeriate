const express = require('express');
const router = express.Router();
const secret = require('../config/secret');  
const sql = require('seriate');
sql.setDefaultConfig(secret);


// Add Route
router.get('/dodaj', function(req, res){
    res.render('artykulDodaj', {
        tytul: 'Dodaj artykuł'
    });
});

// Add Submit POST Route
router.post('/dodaj', function(req, res){
    // [
    //     check('tytul').not().isEmpty().withMessage('Title is required'),
    //     check('autor').not().isEmpty().withMessage('Author is required'),
    //     check('cialo').not().isEmpty().withMessage('Body is required')
    // ]
    // const errors = validationResult(req);

    if (req.body.tytul === '') {
        req.checkBody('tytul').notEmpty().withMessage('Tytuł jest wymagany...');
    } else{
        req.checkBody('tytul','Tytuł powinien mieć  5 do 20 znaków...').isLength({min: 5}).isLength({max: 20});
    }
    if (req.body.autor === '') {
        req.checkBody('autor').notEmpty().withMessage('Autor jest wymagany...');
    } else{
        req.checkBody('autor', 'Autor to max. 30 znaków...').isLength({max: 30});
    }
    if (req.body.cialo === '') {
        req.checkBody('cialo').notEmpty().withMessage('Cialo jest wymagane...');
    } else{
        req.checkBody('cialo', 'Cialo to max. 50 znaków...').isLength({max: 50});
    }

    let errors = req.validationErrors();
    if (errors) {
        res.render('artykulDodaj', {
            tytul: 'Dodaj Artykuł',
            errors: errors
        });
    }
    else {
        sql.execute({
            query: sql.fromFile('../sql/artykulDodaj'),        // query: 'insert nodejs.dbo.[_b_Articles](tytul,autor,cialo) select tytul,autor,cialo from @tabela',
            params: {
                tabela: {
                    val: [{   tytul: req.body.tytul, 
                                autor: req.body.autor, 
                                cialo: req.body.cialo }],
                    asTable: {
                        tytul:     sql.NVARCHAR(20),
                        autor:    sql.NVARCHAR(30),
                        cialo:     sql.NVARCHAR(50)
                    }
                }
            }
        }).then( function(results){
            req.flash('success', 'Artykuł został dodany');
            res.redirect('/');
        }, function (err){
            console.log ('Coś się stało:', err);
        });
    }
});

// UPDATE form
router.get('/edycja/:id', function(req, res){
    sql.execute({
        query: sql.fromFile('../sql/artykul'),
        params: {
            id: {	type: sql.INT, val: req.params.id }
        }
    }).then( function(results){
        res.render('artykulEdycja', {
            title:'Edycja artykułu',
            artykul: results[0]
        });
    }, function (err){
        console.log ('Coś się stało: edycja_id: ', err);
    });
});
  
// Update Submit POST Route
router.post('/edycja/:id', function(req, res){
    sql.execute({
        query: sql.fromFile('../sql/artykulEdytuj'), 
        params: {
            tytul:  { type: sql.NVARCHAR(50),  val: req.body.tytul }, 
            autor: { type: sql.NVARCHAR(50),  val: req.body.autor }, 
            cialo:  { type: sql.NVARCHAR(50),  val: req.body.cialo },
            id:       { type: sql.INT,                       val: req.params.id }
        }
    }).then( function(results){
        req.flash('success', 'Artykuł zaktualizowany');
        res.redirect('/');
    }, function (err){
        console.log ('Coś się stało:', err);
    });
});

router.delete('/:id', function(req, res){
    sql.execute({
        query: sql.fromFile('../sql/artykulUsun'),
        params: {
            id:     { type: sql.INT,  val: req.params.id  }
        }
    }).then( function(results){
        req.flash('success', 'Artykuł usunięty');
        res.send('Success');
    }, function (err){
        console.log ('Coś się stało:', err);
    });
});

// Get single Articles
router.get('/:id', function(req, res){
    sql.execute({
        query: sql.fromFile('../sql/artykul'),
        params: {
            id: {	type: sql.INT, val: req.params.id }
        }
    }).then( function(results){
        res.render('artykul', {
            artykul: results[0]
        });
    }, function (err){
        console.log ('Coś się stało: artykul_id: ', err);
    });
});

module.exports = router;
