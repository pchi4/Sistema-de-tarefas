/* 

const { sequelize } = require('./db')
const db = require('./db');
const Projeto = require('./ProjetoModel');
const Usuario = require('./UsuarioModel');

 const ProjetoUsuario = db.sequelize.define('projetosusuarios',{
    selfGranted:{
        type: db.Sequelize.BOOLEAN
    },
}) 

Usuario.belongsToMany(Projeto,{ through: 'projetosusuarios'})
Projeto.belongsToMany(Usuario,{ through: 'projetosusuarios'})


db.sequelize.sync(ProjetoUsuario);

module.exports = ProjetoUsuario
  */