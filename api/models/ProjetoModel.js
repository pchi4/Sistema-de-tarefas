const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Projeto = mongoose.Schema({

    nome_projeto:{
        type: String
    },
    descricao_tarefa:{
        type: String
    },
    link:{
        type: String
    },
    date:{
        type: Date
    },
    usuario:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        require: true,
    }]

})

mongoose.model("projetos", Projeto)