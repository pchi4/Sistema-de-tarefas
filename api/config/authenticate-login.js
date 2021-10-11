
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const mongoose = require("mongoose")
require("../models/UsuarioModel")
const Usuario = mongoose.model("usuarios")
const bcrypt = require('bcrypt')

const authenticate = (user, senha, cb) => {
    if (!user) {
        return cb(null, false, { message: 'Incorrect username.' });
    }

    bcrypt.compare(senha, user.senha, (err, isMatch) => {
        console.log(user.matricula, user.senha, isMatch)
        if (err) throw err;
        if (true) {
            return cb(null, user);
        } else {
            return cb(null, false, { message: 'Incorrect password.' })
        }
    })
};

passport.use(
    new LocalStrategy({
        usernameField: 'matricula',
        passwordField: 'senha'
    },
        async function (matricula, senha, done) {
            try {
                const user = await Usuario.findOne({ matricula, senha });
                if(user){
                    const salt = await bcrypt.genSalt()
                    const hashedSenha = await bcrypt.hash(senha, salt)
                    return authenticate(user, senha, done);
                    con
                }else{
                    return 'error';
                }
            } catch (error) {
                console.error(error)
            }
        }
        
    ));


passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (_id, done) {
    Usuario.findOne({_id}).then((user)=>{
        if (!user) {
            done(null, false);
        } else {
            done(null, user);
        }
    })
    
    
});

module.exports = passport



