
// EXPORTANDO MODULOS
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require("../models/UsuarioModel")
require("../models/ProjetoModel")
const Projeto = mongoose.model("projetos")
const Usuario = mongoose.model("usuarios")
const { Op } = require("sequelize");
const authenticateLogin = require('../config/authenticate-login');

const makeCadastro = async (req, res,) => {

    const user = req.user

    const u = await Projeto.find({ usuario: user }).limit(5).populate('usuario')
    mapProjeto = u.map(projetos => projetos)

    filterProjeto = mapProjeto.map(projetos => {

        var projeto = {
            id: projetos.id,
            projeto: projetos.nome_projeto,
            tarefa: projetos.descricao_tarefa,
            periodo: projetos.date,
            link: projetos.link,
            usuario: projetos.usuario.length > 0 ? projetos.usuario[0].nomeUsuario : "Não encontrado"
        }

        return projeto

    })

    res.render('usuario/cadastro', {
        grid: 'grid.css',
        cadastro: 'cadastro.css',
        filterProjeto: filterProjeto,
    });

}

const submitFormCad = async (req, res) => {
    try {

        const user = req.user

        const newProject = await Projeto.create({

            nome_projeto: req.body.projeto,
            link: req.body.link,
            descricao_tarefa: req.body.tarefa,
            date: req.body.date,
            usuario: user
        })

    } catch (err) {
        return res.status(400)
    }

    res.redirect('/usuario/cadastro')

}

const makeProject = async (req, res) => {
   
    const user = req.user

    const us = await Projeto.find({usuario: user}).limit(5).populate('usuario')

    mapProjeto = us.map(projetos => projetos)
   
    filterProjeto = mapProjeto.map(projetos => {

        var projeto = {
            id: projetos._id,
            projeto: projetos.nome_projeto,
            tarefa: projetos.descricao_tarefa,
            periodo: projetos.date,
            link: projetos.link,
            usuario: projetos.usuario.length > 0 ? projetos.usuario[0].nomeUsuario : "Não encontrado"
        }

        return projeto
    })
    
    res.render('usuario/projetos', {
        projeto: 'projeto.css',
        grid: 'grid.css',
        filterProjeto: filterProjeto,
        user: user,

    })
}

const filtrar = async (req, res) => {
    const u = await Usuario.findAll({
        where: { id: req.user.id },
        include: [{
            model: Projeto,
        }]
    }) 
}
 
const submitFiltrar = async (req, res) => {
 
    const user = req.user
    const p = await Projeto.find({ date: req.body.date, usuario: user }).limit(5).populate('usuario')
    
    mapProjeto = p.map(projetos => projetos)
 
    buscarProjeto = mapProjeto.map(projetos => {
        return {
           id: projetos._id, 
            projeto: projetos.nome_projeto,
            tarefa: projetos.descricao_tarefa,
            periodo: projetos.date,
            link: projetos.link, 
            usuario: projetos.usuario.length > 0 ? projetos.usuario[0].nomeUsuario : "Não encontrado"
        }
    }) 
    
    res.render('admin/filtrado', {
        filtrado: 'filtrado.css',
        grid: 'grid.css',
        buscarProjeto: buscarProjeto, 
    })
 
} 

const logout = (req, res, next) => {

    req.logout();
    req.session.destroy;
    next();

    console.log('Log out feito com sucesso');
    res.redirect('/')
}

const deletarProject = async (req, res) => {

    try {
        const p = await Projeto.findByIdAndRemove(req.params._id)

        if (p) {
            res.redirect("/usuario/projetos")
        }
    } catch (err) {

    }

}


const editProjeto = async (req, res) => {
    const p = await Projeto.findAll({
        where: {
            'id': req.params.id
        }
    })

    mapEdit = p.map(projetos => projetos.dataValues)

    edit = mapEdit.map(projetos => {
        return {
            id: projetos.id,
            projeto: projetos.nome_projeto,
            tarefa: projetos.descricao_tarefa,
            date: projetos.date
        }
    })
    console.log(edit)

    res.render('usuario/editProjeto', {
        editProjeto: 'editProjeto.css',
        edit: edit
    })

}

/* 
const submitEditProject = (req, res) => {
    Projeto.update({
        nome_projeto: req.body.projeto,
        descricao_tarefa: req.body.tarefa,
        date: req.body.date,
    }, { where: { id: req.body.id } }
 
    ).then((projetos) => {
        res.redirect('admin/cadastro')
    }).catch((err) => {
        console.log(err)
    })
 
} */


router.get('/cadastro', makeCadastro)
router.post('/cadastro', submitFormCad)
router.get('/projetos', makeProject)
router.get('/projetos-filtrados', filtrar)
router.post('/filtrar-projetos', submitFiltrar)  
router.get('/logout', logout)
router.get('/del-projeto/:id', deletarProject)
/* router.get('/edit-projeto/:id', editProjeto)
router.post('/edit-projeto', submitEditProject)
 */
module.exports = router