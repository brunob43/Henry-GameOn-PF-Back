const express = require("express")
const authRouter = express.Router()

const { loginCtrl, registerCtrl} = require("../controllers/authController")

authRouter.post('/login', loginCtrl)

authRouter.post('/register', registerCtrl)

module.exports = authRouter


