
// EXPORTANDO MODULOS
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require("../models/UsuarioModel")
require("../models/ProjetoModel")
const Projeto = mongoose.model("projetos")
const Usuario = mongoose.model("usuarios")
const { eAdmin } = require('../helpers/eAdmin')
const authenticateLogin = require('../config/authenticate-login');

const makeCadastro = async (req, res,) => {

    const user = req.user
    const us = await Projeto.find().limit(5).populate('usuario')
    const u = await Usuario.findById()

    mapProjeto = us.map(projetos => projetos)

    filterProjeto = mapProjeto.map(projetos => {

        var projeto = {
            projeto: projetos.nome_projeto,
            tarefa: projetos.descricao_tarefa,
            periodo: projetos.date,
            link: projetos.link,
            usuario: projetos.usuario.length > 0 ? projetos.usuario[0].nomeUsuario : "Não encontrado"
        }

        return projeto

    })

    res.render('admin/cadastro', {
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

    res.redirect('admin/cadastro')

}

const makeProject = async (req, res) => {

    const us = await Projeto.find().limit(5).populate('usuario')

    mapProjeto = us.map(projetos => projetos)
    filterProjeto = mapProjeto.map(projetos => {

        var projeto = {
            id: projetos._id,
            projeto: projetos.nome_projeto,
            tarefa: projetos.descricao_tarefa,
            periodo: projetos.date,
            link: projetos.link,
            usuario: projetos.usuario.length > 0 ? projetos.usuario[0].matricula : "Não encontrado"
        }

        return projeto

    })

    const user = req.user

    res.render('admin/projetos', {
        projeto: 'projeto.css',
        grid: 'grid.css',
        filterProjeto: filterProjeto,
        user: user,

    })
}

const filtrar = async (req, res) => {
    const pp = await Projeto.find({ date: req.body.date }).limit(5).populate('usuario')
}

const submitFiltrar = async (req, res) => {
    console.log("passei aqui")

    const pp = await Projeto.find({ date: req.body.date }).limit(5).populate('usuario')

    mapProjeto = pp.map(projetos => projetos)

    buscarProjeto = mapProjeto.map(projetos => {
        return {
            id: projetos.id,
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

 Projeto.findByIdAndDelete(
     {_id: req.params.id
    }).then(()=>{
        res.redirect('/admin/projetos')
    })

    
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

    res.render('admin/editProjeto', {
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

router.get('/cadastro', eAdmin, makeCadastro)
router.post('/cadastro', submitFormCad)
router.get('/projetos', makeProject, eAdmin)
router.get('/projetos-filtrados', filtrar, eAdmin)
router.post('/filtrar-projetos', submitFiltrar, eAdmin)
router.get('/logout', logout)
router.get('/del-projeto/:id', deletarProject, eAdmin)
router.get('/edit-projeto/:id', editProjeto, eAdmin)
/* router.post('/edit-projeto', submitEditProject, eAdmin)  */


module.exports = router