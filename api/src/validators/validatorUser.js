const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../handlers/authHandler')

const validateCreate = [ //TODO:name, age, email
    check('user_name')
        .exists()
        .not()
        .isLength({ min: 5 })
        .isEmpty(),
    check('email')
        .exists()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]



module.exports = validateCreate