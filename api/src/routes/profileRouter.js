const { profileHandler, profileEditHandler } = require ("../handlers/profileHandler");

const { Router } = require("express");

const profileRouter = Router();

profileRouter.post('/', profileHandler);

profileRouter.get("/", profileEditHandler)

module.exports = profileRouter;

