
// EXPORTANDO MODULOS
const express = require('express');
const router = express.Router();
const Usuario = require('../models/db-usuario');;
const authenticateLogin = require('../config/authenticate-login');

const auth = authenticateLogin.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
});

//LOGIN

router.get('/login', (req, res) => {

    res.render('login', {
        login: 'login.css',
        loginAnimation: 'loginAnimation.css'
        
    })
    
});

router.post('/login', auth, async (req, res) => {

    res.redirect('/cadastro');

});

module.exports = router;