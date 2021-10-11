
module.exports = {
    eAdmin: function (req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            console.log('success')
            return next();
        }

        console.log(req.isAuthenticated())
        
        // console.log(error)
        res.send('error')
        
    } 
}

    