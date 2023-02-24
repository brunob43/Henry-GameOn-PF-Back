const { httpError } = require('../handlers/authHandler')
const { encrypt, compare } = require('../handlers/authHandler')
const { tokenSign } = require('../handlers/authHandler')
const { User } = require("../db")

//TODO: Login!
const loginCtrl = async (req, res) => {

        const { user_email, user_password } = req.body

        console.log(user_email, user_password)

        const user = await User.findOne({user_email})

        console.log(user)

        if (!user) {
        res.status(404).send({ error: 'User not found' })
        }

        const checkPassword = await compare(user_password, user.user_password) //TODO: Contraseña!

        //TODO JWT 👉
        const tokenSession = await tokenSign(user) //TODO: 2d2d2d2d2d2d2

        if (checkPassword) { //TODO Contraseña es correcta!
        return res.status(200).send({data: user,tokenSession})
        }

        if (!checkPassword) {
        return res.status(409).send({error: 'Invalid password'})
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

        res.status(200).send({ data: registerUser })

    } catch (error) {
        //httpError(res, e)
        res.status(400).json({ error })
    }
}
module.exports = { loginCtrl, registerCtrl }