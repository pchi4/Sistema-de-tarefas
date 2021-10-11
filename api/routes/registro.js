
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Usuario = require('../models/UsuarioModel');
const Projeto = require('../models/ProjetoModel');


router.get('/registro', async (req, res)=>{

    res.render('registro',{
        registro: 'registro.css' 
        
    })
})


router.post('registro', async(req, res)=>{
   
   
    if(!req.body.matricula){
        res.status(404)
    }

    if(!req.body.senha.length <4 ){
        res.status(404)
    }
    if(!req.body.nome){
        res.status(404)
    }
    
    const user = await Usuario.create({
        matricula: req.body.matricula,
        nomeUsuario: req.body.nome,
        senha: req.body.senha,

    })

    bcrypt.genSalt(10, (erro, salt)=>{
        bcrypt.hash(user.senha, salt, (erro, hash)=>{
            if(erro){
                res.status(404)
                res.redirect('/login')
            }

            user.senha = hash
        })
    })
})



module.exports = router