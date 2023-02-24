const jwt = require('jsonwebtoken') //TODO : 😎

const tokenSign = async (user) => { //TODO: Genera Token
    return jwt.sign(
        {
            _id: user._id, //TODO: <---
            role: user.role
        }, //TODO: Payload ! Carga útil
        process.env.JWT_SECRET, //TODO ENV 
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}

const bcrypt = require('bcryptjs') //TODO: <--- 😎

//TODO: Encriptamos!!
const encrypt = async (textPlain) => { //TODO: 123456
    const hash = await bcrypt.hash(textPlain, 10) //0404o4ofoto4o
    return hash
}

//TODO: Comparamos!!
const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

const httpError = (res, err) => {
    console.log(err)
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}

const { validationResult } = require('express-validator'); //TODO:

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}
module.exports = { tokenSign, decodeSign, verifyToken, encrypt, compare, httpError, validateResult }