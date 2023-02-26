import { profileHandler } from "../handlers/profileHandler";

const express = require("express");
const router = express.Router();


router.post('/', profileHandler);


module.exports = router;