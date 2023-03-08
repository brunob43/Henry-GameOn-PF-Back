const { Router } = require("express")
const PaymentController = require("../controllers/PaymentController");
const { docLikesHandler } = require("../handlers/docHandlers");
const {Payment20Handler, Payment50Handler, Payment100Handler} = require("../handlers/PaymentHandlers");
const paymentPostHandlers = require("../handlers/paymentPostHandlers")

const paymentRouter = Router()

paymentRouter.get("/20", function (req, res, next) {
    const { donation_id } = req.query
    let Payment20 = new PaymentController(new Payment20Handler(donation_id))
    Payment20.getPaymentLink(req, res);

  });

  paymentRouter.get("/50", function (req, res, next) {
    const { donation_id } = req.query
    let Payment50 = new PaymentController(new Payment50Handler(donation_id))
    Payment50.getPaymentLink(req, res);
  });

  paymentRouter.get("/100", function (req, res, next) {
    const { donation_id } = req.query
    let Payment100 = new PaymentController(new Payment100Handler(donation_id))
    Payment100.getPaymentLink(req, res);
  });
  
paymentRouter.post("/", paymentPostHandlers) 


module.exports = paymentRouter;
