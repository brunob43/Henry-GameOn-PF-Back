const axios = require("axios");

class PaymentHandler {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "",
      items: [
        {
          title: "donacion de $1",
          description: "donacion de prueba en cuentas reales",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 1
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      },
    // notification_url:"http://localhost:3001/payment/donations" Comenzar luego de el Deploy en donationHandler y paymentRoute
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }
}

module.exports = PaymentHandler;