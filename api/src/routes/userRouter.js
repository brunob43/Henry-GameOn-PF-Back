const { Router } = require("express")
const {getUsersHandler, getIDUsersHandler, updateUsersHandler, postUsersHandler, deleteUsersHandler} = require("../handlers/userHandlers")




const userRouter = Router()


userRouter.get("/", getUsersHandler)

userRouter.get("/:id", getIDUsersHandler)

userRouter.put("/:id", updateUsersHandler)

userRouter.post("/", postUsersHandler)

userRouter.delete("/:id", deleteUsersHandler)

module.exports = userRouter