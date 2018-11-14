const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const secret = require('../config/secret');  
const sql = require('seriate');
sql.setDefaultConfig(secret);



//  Register form
router.get('/rejestracja', (req, res) => {
    res.render('rejestracja', {
        tytul: 'Rejestracja użytkownika'
    });
});


// Register process
router.post('/rejestracja', function(req, res){
    req.checkBody('nazwa').notEmpty().isLength({max: 30}).withMessage('Nazwa jest wymagana (max. 30 znaków)...');
    req.checkBody('email').notEmpty().isLength({max: 30}).withMessage('Email jest wymagany (max. 30 znaków)...');
    req.checkBody('email','Email nie jest poprawny...').isEmail();
    req.checkBody('uzytkownik','Uzytkownik jest wymagany...').notEmpty();
    req.checkBody('haslo','Haslo jest wymagane...').notEmpty();
    req.checkBody('haslo2','Hasła nie zgadzają się...').equals(req.body.haslo);
    let errors = req.validationErrors();
    if (errors) {
        res.render('rejestracja', {
            tytul: 'Rejestracja użytkownika',
            errors: errors
        });
    }
    else {
        bcrypt.genSalt(10, function(err2, salt){
            bcrypt.hash(req.body.haslo, salt, function(err2, hash){
                if (err2) {
                    console.log(err2);
                }
                sql.execute({
                    query: sql.fromFile('../sql/uzytkownicy/rejestracja'),
                    params: {
                        tabela: {
                            val: [{   
                                nazwa: req.body.nazwa, 
                                email: req.body.email, 
                                uzytkownik: req.body.uzytkownik, 
                                haslo:  hash
                            }],
                            asTable: {
                                nazwa: sql.NVARCHAR(30),
                                email:   sql.NVARCHAR(30),
                                uzytkownik:    sql.NVARCHAR(30),
                                haslo:   sql.NVARCHAR(100)
                            }
                        }
                    }
                }).then( function(results){
                    req.flash('success', 'Użytkownik został zarejestrowany ');
                    res.redirect('/uzytkownicy/logowanie');
                }, function (err){
                    console.log ('Coś się stało: rejestracja_post: ', err);
                });

            });
        });
    }
});


// Formularz logowania
router.get('/logowanie', function(req,res){
    res.render('logowanie');
});

router.post('/logowanie', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/uzytkownicy/logowanie',
        failureFlash: true
    })(req, res, next);
});


// logout
router.get('/wylogowanie', function(req, res, ){
    req.logout();
    req.flash('success', 'Jesteś wylogowany');
    res.redirect('/uzytkownicy/logowanie');
});

module.exports = router;
