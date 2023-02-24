const { Router } = require("express")
const {getUsersHandler, getIDUsersHandler, updateUsersHandler, postUsersHandler, deleteUsersHandler} = require("../handlers/userHandlers")
const {checkAuth, checkRoleAuth, checkOrigin}  = require('../middleware/authUser')
const validateCreate  = require('../validators/validatorUser')
const userRouter = Router()

userRouter.get("/", /*checkAuth, checkRoleAuth(['admin']),*/ getUsersHandler)

userRouter.get("/:id", checkOrigin ,getIDUsersHandler)

userRouter.put("/:internal_id",updateUsersHandler)

userRouter.post("/", checkOrigin, validateCreate, postUsersHandler)

userRouter.delete("/:internal_id", deleteUsersHandler)   //Borrado lógico

module.exports = userRouter
