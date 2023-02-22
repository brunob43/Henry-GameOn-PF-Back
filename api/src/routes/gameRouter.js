const { Router } = require("express")
const gameRouter = Router()

const {getGameHandler, getIdGameHandler, postGameHandler, updateGameHandler, deleteGameHandler,gamesViewsHandler} = require("../handlers/gameHandlers")

gameRouter.get("/", getGameHandler)

gameRouter.get("/:id", getIdGameHandler)

gameRouter.put("/:game_id", updateGameHandler)

gameRouter.post("/", postGameHandler)

gameRouter.delete("/:game_id", deleteGameHandler)   //Borrado lógico

gameRouter.put ("/view/:game_id", gamesViewsHandler)

 module.exports = gameRouter
 