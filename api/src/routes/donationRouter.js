const { Router } = require('express');
const donationRouter = Router()
const { donationHandler } = require("../handlers/donationHandler")

donationRouter.get("/", donationHandler)

module.exports = donationRouter