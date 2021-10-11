const Usuario = require('../models/db-usuario')
  function criarUsuario(matricula, senha){
    Usuario.create({
        matricula: matricula,
        nomeUsuario: nomeUsuario,
        senha: senha
    })
    
}

module.exports= {criarUsuario};
