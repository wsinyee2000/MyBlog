const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.use(express.static('public'));

//Create new blog
router.get('/createblog', ensureAuthenticated, (req, res) => res.render('createBlog', {name: req.user.username, title: 'New Blog', style: 'index'}));


module.exports = router;