const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51PIWbfSI7xSGzxItuysmD157Kfj23KmePiEkBH5Kzj9Juaa0YTf36cAXFs3uE8NwhMeOb7wlOy1MIEEblQ12QMzA00dUyYSMbQ');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
