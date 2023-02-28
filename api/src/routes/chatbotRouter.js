const express = require("express");
const chatbotRouter = express.Router();

const {
  Generate,
  Generate2,
  Generate3,
} = require("../handlers/chatbotHandler");

chatbotRouter.post("/generate", Generate);

chatbotRouter.post("/generate2", Generate2);

chatbotRouter.post("/generate3", Generate3);

module.exports = chatbotRouter;
