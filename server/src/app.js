require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const sendMail = require('./utilities/sendMail');
const identities = require('./identities');
const {
  ID,
  GENDER,
  NAME,
  NATIONALITY,
  AVATAR,
  FLAG,
  COUNTRY_SHRT,
  PRICE,
  UNIT_PRICE,
  UNIT_PRICE_CURRENCY_SYMBOL,
  UNIT_PRICE_CURRENCY,
} = require('./constants/constants');
const { getSortedIdentities } = require('./utilities/getSortedIdentities');
const { getFilteredIdentites } = require('./utilities/getFilteredIdentites');
const { addToCache, getFromCache } = require('./utilities/cache');

const PORT = process.env.PORT || 5050;
const HOST_NAME = process.env.HOST_NAME || 'http://localhost' + ':' + PORT;
const IDENTITY_BUY_URL =
  process.env.IDENTITY_BUY_URL || 'http://localhost:3000';

const app = express();

app.use(cors({ origin: [IDENTITY_BUY_URL] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/identities', (req, res) => {
  try {
    const { filters, sort } = req.body;
    const filteredIdentities = getFilteredIdentites(identities, filters || {});

    const filteredIdentitesFreeVersion = filteredIdentities.map((identity) => {
      return {
        [ID]: identity.id,
        [NAME]: `${identity.name.first} ${identity.name.last}`,
        [GENDER]: identity.gender,
        [AVATAR]: identity.picture,
        [NATIONALITY]: {
          [COUNTRY_SHRT]: identity.nat,
          [FLAG]: `https://flagcdn.com/20x15/${identity.nat.toLowerCase()}.png`,
        },
        [PRICE]: {
          value: UNIT_PRICE,
          currency: UNIT_PRICE_CURRENCY,
          currency_symbol: UNIT_PRICE_CURRENCY_SYMBOL,
        },
      };
    });

    const sortedIdentities = getSortedIdentities(
      filteredIdentitesFreeVersion,
      sort,
    );

    res.json(sortedIdentities);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.use('/checkout', async (req, res) => {
  try {
    const { identitiesId, email } = req.body;

    const filteredIdenties = getFilteredIdentites(identities, {
      id: identitiesId,
    });

    const line_items = filteredIdenties.map((identity) => {
      const name = identity.name.first + ' ' + identity.name.last;

      return {
        price_data: {
          currency: UNIT_PRICE_CURRENCY,
          product_data: {
            name,
            images: [identity.picture],
            id: identities.id,
          },
          unit_amount: UNIT_PRICE * 100,
        },
        quantity: 1,
      };
    });

    const customer = await stripe.customers.create({
      email,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customer.id,
      success_url: HOST_NAME + '/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: IDENTITY_BUY_URL,
    });

    addToCache(session.id, filteredIdenties);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/success', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
    );
    const filteredIdentites = getFromCache(session.id);

    if (!filteredIdentites) throw new Error('Incorrect ID');

    const text = `Get your Identities here, link valid for only 4 hours ${HOST_NAME}/ids?id=${session.id}`;
    sendMail(session.customer_details.email, text);

    res.redirect(IDENTITY_BUY_URL + '?success');
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/ids', (req, res) => {
  try {
    const id = req.query['id'];
    if (!id) throw new Error('No ID Given');

    const filteredIdentites = getFromCache(id);
    if (!Object.keys(filteredIdentites).length)
      throw new Error(
        'ID does not exist or it has been cleared from our cache due to security reasons',
      );

    res.send(JSON.stringify(filteredIdentites, null, 4));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use('/', (req, res) => {
  res.json({ message: 'Use the predefined routes' });
});

app.listen(PORT);
