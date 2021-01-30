const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('index', {title: 'Home', style: 'index'}));

//Dashboard
router.get('/welcome', ensureAuthenticated, (req, res) => res.render('welcome', {name: req.user.username, title: 'Welcome', style: 'index'}));


module.exports = router;