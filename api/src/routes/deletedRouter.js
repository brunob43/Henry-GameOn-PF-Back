const { Router } = require("express")
const { deletedHandler } = require("../handlers/deletedHandler")
const deletedRouter = Router()

deletedRouter.get("/", deletedHandler)

module.exports = deletedRouter