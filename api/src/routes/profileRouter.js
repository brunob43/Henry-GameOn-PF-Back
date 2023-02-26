import { profileController } from "../controllers/profileController";

const express = require("express")
const router = express.Router()


router.post('/', profileController)


module.exports = router