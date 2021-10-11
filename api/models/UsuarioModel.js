const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Usuario = mongoose.Schema({

    matricula:{
        type: String,
        required: true
    },
    eAdmin:{
        type: Number,
    },
    nomeUsuario:{
        type: String
    },
    senha:{
        type: String
    },
    projeto:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projetos',
        require: true,
    }]
})

mongoose.model("usuarios", Usuario)


