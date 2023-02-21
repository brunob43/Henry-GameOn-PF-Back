const { Router } = require("express")
const messageRouter = Router()

const {getMessages, getIdMessage, postMessage,deleteMessage} = require("../handlers/messageHandlers")

messageRouter.get("/", getMessages)

messageRouter.get("/:id", getIdMessage)

messageRouter.post("/", postMessage)

messageRouter.delete("/:message_id", deleteMessage)   //Borrado lógico solo borra el admin

module.exports = messageRouter
