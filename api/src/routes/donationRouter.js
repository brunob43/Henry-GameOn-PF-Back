const { Router } = require('express');
const donationRouter = Router()
const { donationHandler } = require("../handlers/donationHandler")
const { postDonationHandler } = require("../handlers/postDonationHandler")

donationRouter.get("/", donationHandler)

donationRouter.post("/create", postDonationHandler)

module.exports = donationRouter