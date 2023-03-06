const axios = require("axios");

class Payment20Handler {
  constructor(donation_id){
    donation_id = this.donation_id
  }
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_1311245836@testuser.com",
      items: [
        {
          title: "ayudita $20",
          description: "pago de prueba donacion de $20",
          id: donation_id,
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 20
        }
      ],
      back_urls: {
        failure: "https://henry-pf-front.vercel.app/donation",
        pending: "https://henry-pf-front.vercel.app/donation",
        success: "https://henry-pf-front.vercel.app/donation"
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

class Payment50Handler {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_1311245836@testuser.com",
      items: [
        {
          title: "manon $50",
          description: "pago de prueba donacion de $50",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 50
        }
      ],
      back_urls: {
        failure: "https://henry-pf-front.vercel.app/donation",
        pending: "https://henry-pf-front.vercel.app/donation",
        success: "https://henry-pf-front.vercel.app/donation"
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

class Payment100Handler {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_1311245836@testuser.com",
      items: [
        {
          title: "euforia $100",
          description: "pago de prueba donacion de $100",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 100
        }
      ],
      back_urls: {
        failure: "https://henry-pf-front.vercel.app/donation",
        pending: "https://henry-pf-front.vercel.app/donation",
        success: "https://henry-pf-front.vercel.app/donation"
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

module.exports = { Payment20Handler, Payment50Handler, Payment100Handler };