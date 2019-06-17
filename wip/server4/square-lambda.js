// require global packages
const { utils, providers } = require('ethers');
const { json, send } = require('micro');
const Joi = require('joi');
const crypto = require('crypto');
const squareConnect = require('square-connect');
const cors = require('micro-cors')();

// mongo setup method
const { connect } = require('./mongo');

// server addr: 0x2F5fAbb7c30bB6De4Cf9DdDE2F3085B21427E94A

const {
  accessToken,
  locationId,
} = require('./config');

// Set Square Connect credentials
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;

// validate notify
const validationSchema = {
  nonce: Joi.string().required(),
  names: Joi.array().items(Joi.string()), // ens names to purchase
  owner: Joi.string().required(), // owner address
};

// Notify lambda
module.exports = cors(async (req, res) => {
  try {
    // intercept and parse post body
    const body = (await json(req));
    const {
      nonce,
      names,
      owner,
    } = body;

    // joi validate the body
    const { error } = Joi.validate(body, validationSchema);
    if (error) throw new Error(error);

    // connect mongo
    const { Payment } = await connect();

    // Square Payment begins
    const requestParams = body;
    const idempotencyKey = crypto.randomBytes(64).toString('hex');

    // Charge the customer's card
    const transactionsApi = new squareConnect.TransactionsApi();
    const amount = names.length * 600;
    const data = await transactionsApi.charge(locationId, {
      card_nonce: nonce,
      amount_money: {
        amount, // $1.00 charge
        currency: 'USD',
      },
      idempotency_key: idempotencyKey,
    });

    const payment = new Payment({
      transactionId: data.transaction.id,
      names: names, // names purchased
      owner: owner, // owner of the names
      card: data.transaction.tenders[0].card_details, // card details
      amount, // amount of money
      currency: 'USD', // currency used
      created: new Date(), // created
    });
    await payment.save();

    // return true
    send(res, 200, { result: data });
  } catch (error) {
    send(res, 400, (error.response || {}).text || error.message);
  }
});
