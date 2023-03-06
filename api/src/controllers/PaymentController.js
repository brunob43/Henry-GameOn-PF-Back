require('dotenv').config();
import axios from 'axios';
const {ACCESS_TOKEN} = process.env


class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getPaymentLink(req, res) {
      try {
        const payment = await this.subscriptionService.createPayment();
        console.log(payment)
        const paymentDetail = axios.get(`https://api.mercadopago.com/v1/payments/${payment.data.id}`, {headers: {Authorization : ACCESS_TOKEN }})
        console.log(paymentDetail)
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" });
      }
    }
  }
  
  module.exports = PaymentController;