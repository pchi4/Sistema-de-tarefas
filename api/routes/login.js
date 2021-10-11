
// EXPORTANDO MODULOS
const express = require('express');
const router = express.Router();
const Usuario = require('../models/UsuarioModel');;
const authenticateLogin = require('../config/authenticate-login');

const auth = authenticateLogin.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
});

//LOGIN

router.get('/', (req, res) => {

    res.render('login', {
        login: 'login.css',
        loginAnimation: 'loginAnimation.css'
        
    })
    
});

router.post('/login', auth, async (req, res) => {

    if(req.user.eAdmin == 1) {
        res.redirect('/admin/cadastro');
    } else{
        
        res.redirect('/usuario/cadastro');
    }
 
});

module.exports = router; 