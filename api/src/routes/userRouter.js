const { Router } = require("express")
const {getUsersHandler, getIDUsersHandler, updateUsersHandler, postUsersHandler, deleteUsersHandler} = require("../handlers/userHandlers")

const userRouter = Router()


userRouter.get("/?deletedusers=", getUsersHandler)

userRouter.get("/:id", getIDUsersHandler)

userRouter.put("/:internal_id", updateUsersHandler)

userRouter.post("/", postUsersHandler)

userRouter.delete("/:internal_id", deleteUsersHandler)   //Borrado lógico

module.exports = userRouter