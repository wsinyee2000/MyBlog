const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');

router.use(express.static('public'));

//Login Page
// router.get('/login', (req, res) => res.send('Login'));
router.get('/login', (req, res) => {
    res.render('login', {title: 'Login', style: 'signup'})
});


//Register Page
router.get('/register', (req, res) => {
    res.render('register', {title: 'Register', style: 'signup'});
});
// router.get('/register', (req, res) => res.send('Register'));

//Register Handle
router.post('/register', (req, res) => {
    const { username, email, password, password2, title, style} = req.body;
    let errors = [];

    //Check required fields
    if(!username || !email || !password) {
        errors.push({ msg: 'Please fill in everything'})
    }

    //Check password match
    if(password  !== password2){
        errors.push({msg: 'Password do not match'});
    }

    //Check password length
    if(password.length < 6) {
        errors.push({msg: 'Password need to be more than 6 characters'});
    }

    if(errors.length > 0){
        res.render('register', {
            title: 'Register', style: 'signup',
            errors,
            username,
            email,
            password,
            password2
        });
    } else {
        // Validation passed
        User.findOne({username: username})
            .then(user => {
                if(user) {
                    //User exists
                    errors.push({ msg: 'Username is already registered' })
                    res.render('register', {
                        title: 'Register', style: 'signup',
                        errors,
                        username,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        username,
                        email,
                        password
                    });

                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //Set password to hash
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                    }))
                }
            });
    }

});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/welcome',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;