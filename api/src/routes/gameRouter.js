const { Router } = require('express');
const gameRouter = Router()

const {getGameHandler, getIdGameHandler, postGameHandler, updateGameHandler, deleteGameHandler} = require("../handlers/gameHandlers")

// gameRouter.get("/", getGameHandler)

// gameRouter.get("/:id", getIdGameHandler)

// gameRouter.put("/:id", updateGameHandler)

// gameRouter.post("/", postGameHandler)

// gameRouter.delete("/:internal_id", deleteGameHandler)   //Borrado lógico

 module.exports = gameRouter
 