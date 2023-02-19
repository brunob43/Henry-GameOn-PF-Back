const { Router } = require("express")
const PaymentController = require("../controllers/PaymentController");
const PaymentHandlers = require("../handlers/PaymentHandlers");
const paymentPostHandlers = require("../handlers/paymentPostHandlers")

const PaymentInstance = new PaymentController(new PaymentHandlers());
const paymentRouter = Router()

paymentRouter.get("/", function (req, res, next) {
    PaymentInstance.getPaymentLink(req, res);
  });
  
paymentRouter.post("/payment", paymentPostHandlers) // Comenzar luego de el Deploy en donationHandler y paymentHandler


module.exports = paymentRouter;