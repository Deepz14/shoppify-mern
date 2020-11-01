const jwt = require('jsonwebtoken');
const User = require('./models/user');

const {SECRET_KEY} = require('./config/keys');

const auth = async(req, res, next) => {

    const token = req.header('auth-token')

    if(!token) return res.status(401).json({status : 'Access Denied...'})

    try{

        const verified = jwt.verify(token, SECRET_KEY)

        const {id} = verified;

        const userData = await User.findById(id)

        req.user = userData
        
        next()

    }
    catch(err){
        res.status(401).json({status : 'Invalid Token...'})
    }

}


module.exports = auth;