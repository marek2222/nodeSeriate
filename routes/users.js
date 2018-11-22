const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const secret = require('../config/secret');  
const sql = require('seriate');
sql.setDefaultConfig(secret);


// Register form
router.get('/register', function(req, res){
    res.render('register');
});

// Register process
router.post('/register', function(req, res){

    if (req.body.name === '') {
        req.checkBody('name','Nazwa jest wymagana...').notEmpty();
    } else {
        req.checkBody('name', 'Nazwa to max. 30 znaków...').isLength({max: 30});
    }
    if (req.body.email === '') {
        req.checkBody('email','Email jest wymagany...').notEmpty();
    } else {
        req.checkBody('email','Email nie jest poprawny...').isEmail();
        req.checkBody('email', 'Email to max. 30 znaków...').isLength({max: 30});
    }
    if (req.body.username === '') {
        req.checkBody('username','Uzytkownik jest wymagany...').notEmpty();
    } else {
        req.checkBody('username','Uzytkownik to max. 30 znaków...').isLength({max: 30});
    }
    if (req.body.password === '') {
        req.checkBody('password','Hasło jest wymagane...').notEmpty();
    } else {
        req.checkBody('password','Hasło to max. 30 znaków...').isLength({max: 30});
    }
    if (req.body.password2 === '') {
        req.checkBody('password2','Hasło potwierdzające jest wymagane...').notEmpty();
    } else {
        req.checkBody('password2','Hasło potwierdzające to max. 30 znaków...').isLength({max: 30});
        req.checkBody('password2','Hasła nie zgadzają się...').equals(req.body.password);
    }

    let errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    }
    else {
        bcrypt.genSalt(10, function(err2, salt) {
            bcrypt.hash(req.body.password, salt, function(err2, hash) {
                if (err2) {
                    console.log(err2);
                }
                sql.execute({
                    query: sql.fromFile('../sql/users/register'),
                    params: {
                        tabela: {
                            val: [{   
                                name: req.body.name, 
                                email: req.body.email, 
                                username: req.body.username, 
                                password:  hash
                            }],
                            asTable: {
                                name: sql.NVARCHAR(30),
                                email:   sql.NVARCHAR(30),
                                username:    sql.NVARCHAR(30),
                                password:   sql.NVARCHAR(100)
                            }
                        }
                    }
                }).then( function(results){
                    req.flash('success', 'Użytkownik został zarejestrowany ');
                    res.redirect('/users/login');
                }, function (err){
                    console.log ('Coś się stało: rejestracja_post: ', err);
                });

            });
        });
    }
});

// Login Form
router.get('/login', function(req, res){
    res.render('login');
});
   
  // Login process
router.post('/login', function(req, res, next){
    if (req.body.username === '') {
        req.checkBody('username', 'Cialo jest wymagane...').notEmpty();
    } else{
        req.checkBody('username', 'Cialo to max. 30 znaków...').isLength({max: 30});
    }
    if (req.body.password === '') {
        req.checkBody('password', 'Hasło jest wymagane...').notEmpty();
    } else{
        req.checkBody('password', 'Hasło to max. 30 znaków...').isLength({max: 30});
    }

    let errors = req.validationErrors();
    if (errors) {
        res.render('login', {
            errors: errors
        });
    }
    else {
        passport.authenticate('local', {
            successRedirect:'/',
            failureRedirect:'/users/login',
            failureFlash: true
        })(req, res, next);
    }
});
  
// logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});
  

module.exports = router;
