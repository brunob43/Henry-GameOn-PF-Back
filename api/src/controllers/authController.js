const { httpError } = require('../handlers/authHandler')
const { encrypt, compare } = require('../handlers/authHandler')
const { tokenSign } = require('../handlers/authHandler')
const { User } = require("../db")

//TODO: Login!
const loginCtrl = async (req, res) => {
    try {
        const { user_email, user_password } = req.body

        console.log(user_email, user_password)

        const user = await User.findOne({user_email})

        console.log(user)

        if (!user.length) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(user_password, user.user_password) //TODO: Contraseña!

        //TODO JWT 👉
        const tokenSession = await tokenSign(user) //TODO: 2d2d2d2d2d2d2

        if (checkPassword) { //TODO Contraseña es correcta!
            res.send({
                data: user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

//TODO: Registramos usuario!
const registerCtrl = async (req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const { user_email, user_password, user_name } = req.body

        const passwordHash = await encrypt(user_password) //TODO: (123456)<--- Encriptando!!
        const registerUser = await User.create({
            user_email,
            user_name,
            user_password: passwordHash
        })

        res.send({ data: registerUser })

    } catch (e) {
        httpError(res, e)
    }
}
module.exports = { loginCtrl, registerCtrl }