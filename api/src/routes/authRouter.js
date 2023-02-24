const express = require("express")
const router = express.Router()

const { loginCtrl, registerCtrl} = require("../controllers/authController")

router.post('/login', loginCtrl)

router.post('/register', registerCtrl)

module.exports = router


