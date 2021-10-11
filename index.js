// EXPORTANDO MODULOS
const path = require('path');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require("mongoose")
const moment = require('moment');
const admin = require('./api/routes/admin')
const usuario = require('./api/routes/usuario')
const login = require('./api/routes/login');
const registro = require('./api/routes/registro');
const authenticateLogin = require('./api/config/authenticate-login')
var cookieParser = require('cookie-parser');

// CONFIGURAÇÕES

//BODY-PARSER
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//PATH
app.set('views', path.join(__dirname, 'api/views'));
app.use(express.static(__dirname + '/public'));


//MONGO

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cadastrodetarefas").then(()=>{
    console.log("Conexão Mongo feita com sucesso")
}).catch((err)=>{
    console.log("Houve um erro ao conectar " +err)
})


//SESSION
app.use(session({
    secret: 'login',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*100}
}));

//PASSPORT
app.use(authenticateLogin.initialize())
app.use(authenticateLogin.session());


app.use(flash())

// MIDLEWATRE VARIAVEL GLOBAL
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.user = req.user || null;
    next()
})


// HANDLEBARS
app.engine('handlebars', handlebars({
    defaultLayout: 'main-cadastro',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))

app.set('view engine', 'handlebars');

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated())  return next();
    res.redirect('/');
  }

//ROTAS
app.use('/', login)
// app.use('/', registro)
app.use('/admin', authenticationMiddleware,  admin)  
app.use('/usuario',  authenticationMiddleware, usuario)


app.listen(8080);