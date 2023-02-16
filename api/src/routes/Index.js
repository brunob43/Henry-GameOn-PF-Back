const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const userRouter = require("./userRouter");
const gameRouter = require("./gameRouter");
const docRouter = require("./docRouter");
const paymentRouter = require("./paymentRouter")

const router = Router();

router.use("/payment", paymentRouter)
router.use("/users", userRouter)
router.use("/game", gameRouter)
router.use("/doc", docRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;