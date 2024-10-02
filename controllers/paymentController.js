// server/controllers/paymentController.js
const Payment = require('../models/Payment');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount * 100, // amount in cents
      currency: 'usd',
      source: token,
      description: 'Test Charge',
    });

    const payment = new Payment({
      cardNumber: '**** **** **** ' + charge.source.last4,
      expiry: charge.source.exp_month + '/' + charge.source.exp_year,
      cvv: '***',
      amount: charge.amount / 100,
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
