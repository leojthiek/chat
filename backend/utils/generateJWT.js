const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    return jwt.sign({id},"jshdjhfdskfj",{
        expiresIn: 86400 
    })
}

module.exports = generateToken