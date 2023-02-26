const { profileHandler } = require ("../handlers/profileHandler");

const { Router } = require("express");

const profileRouter = Router();

profileRouter.post('/', profileHandler);

module.exports = profileRouter;

