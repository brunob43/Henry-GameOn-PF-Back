const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const userRouter = require("./userRouter");

const router = Router();

router.use("/users", userRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;