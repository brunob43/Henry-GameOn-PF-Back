const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const userRouter = require("./userRouter");
const gameRouter = require("./gameRouter");
const docRouter = require("./docRouter");
const paymentRouter = require("./paymentRouter")
const messageRouter = require("./messageRouter")
const deletedRouter = require("./deletedRouter")
const profileRouter = require("./profileRouter")
const authRouter = require("./authRouter")

const router = Router();


router.use("/deleted", deletedRouter)
router.use("/payment", paymentRouter)
router.use("/users", userRouter)
router.use("/game", gameRouter)
router.use("/doc", docRouter)
router.use("/message", messageRouter)
router.use("/profile", profileRouter)
router.use("/auth", authRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;