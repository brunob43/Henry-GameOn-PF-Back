
const { Router } = require('express');
const docRouter = Router()
const {getDocHandler, getIdDocHandler, postDocHandler, updateDocHandler, deleteDocHandler, docViewsHandler, docLikesHandler} = require("../handlers/docHandlers")

docRouter.get("/", getDocHandler)

docRouter.get("/:id", getIdDocHandler)

docRouter.put("/:doc_id", updateDocHandler) //solo borra el que creo el users

docRouter.post("/", postDocHandler)

docRouter.delete("/:doc_id", deleteDocHandler)   //Borrado lógico solo borra el admin

docRouter.put ("/view/:doc_id", docViewsHandler)

docRouter.put ("/like/:doc_id", docLikesHandler)

module.exports = docRouter


