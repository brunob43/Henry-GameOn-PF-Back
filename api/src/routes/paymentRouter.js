const { Router } = require("express")
const PaymentController = require("../controllers/PaymentController");
const {Payment20Handler, Payment50Handler, Payment100Handler} = require("../handlers/PaymentHandlers");
const paymentPostHandlers = require("../handlers/paymentPostHandlers")

const Payment20Instance = new PaymentController(new Payment20Handler());
const Payment50Instance = new PaymentController(new Payment50Handler());
const Payment100Instance = new PaymentController(new Payment100Handler());

const paymentRouter = Router()

paymentRouter.get("/20", function (req, res, next) {
    Payment20Instance.getPaymentLink(req, res);
  });

  paymentRouter.get("/50", function (req, res, next) {
    Payment50Instance.getPaymentLink(req, res);
  });

  paymentRouter.get("/100", function (req, res, next) {
    Payment100Instance.getPaymentLink(req, res);
  });
  
paymentRouter.post("/", paymentPostHandlers) // Comenzar luego de el Deploy en donationHandler y paymentHandler


module.exports = paymentRouter;