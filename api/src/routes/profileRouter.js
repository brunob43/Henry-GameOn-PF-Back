const { profileHandler } = require ("../handlers/profileHandler");
const express = require("express");
const router = express.Router();

const profileRouter = router();


profileRouter.post('/', profileHandler);


module.exports = profileRouter;