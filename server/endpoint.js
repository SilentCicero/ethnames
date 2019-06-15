const { utils, Wallet } = require('ethers');
const { json, send } = require('micro');
const axios = require('axios');
const { call, Eth, balanceOf, onReceipt, solToABI, encodeMethod } = require('ethjs-extras');
const Joi = require('joi');

// configuration settings
const {
  nickpayAddress,
  daiTokenAddress,
  feeCollectionAccount,
  connect,
  pickupABI,
  provider,
  eth,
} = require('./config');

// utility functions
const {
  noop,
  lower,
  halfHour,
  one,
  gasLimit,
  oneEther,
  fiveMinutes,
  unixtime,
  oneDai,
  fourCentsOfDai,
  pickupGasUsed,
} = require('./utils');

// eth price
let ethusd = null;
let ethusdLastChecked = unixtime();

// gas prices
let gasPrice = null;
let gasPriceLastChecked = unixtime();

// validate notify
const validationSchema = {
  destination: Joi.string().regex(/^0x[0-9a-fA-F]{64}$/).required(),
  expiry: Joi.string().regex(/^[0-9]+$/).min(5).max(215).required(),
  token: Joi.string().regex(/^0x[0-9a-fA-F]{40}$/).required(),
  amount: Joi.string().regex(/^[0-9]+$/).min(1).max(215).required(),
  feeRecipient: Joi.string().regex(/^0x[0-9a-fA-F]{40}$/).required(),
  fee: Joi.string().regex(/^[0-9]+$/).min(1).max(215).required(),
  creatorSignature: Joi.string().regex(/^0x[0-9a-fA-F]{130}$/).required(),
  recipientSignature: Joi.string().regex(/^0x[0-9a-fA-F]{130}$/).required(),
};

// Notify lambda
module.exports = async (req, res) => {
  try {
    // intercept and parse post body
    const body = await json(req);
    const {
      recipientSignature,
      creatorSignature,
      expiry,
      token,
      destination,
      amount,
      feeRecipient,
      fee,
    } = body;

    // joi validate the body
    const { error } = Joi.validate(body, validationSchema);
    if (error) throw new Error(error);

    // connect mongo
    const { Pickup } = await connect();

    // produce lookup hash
    const _id = utils.keccak256(utils.toUtf8Bytes([
      lower(recipientSignature),
      lower(creatorSignature),
      lower(expiry),
      lower(token),
      lower(destination),
      lower(amount),
      lower(feeRecipient),
      lower(fee),
    ].join('')));

    // find if Tx has already been processed.
    const findPickup = (await Pickup.find({ _id }, '_id').limit(1).lean().exec()).pop();

    // check db for tx before going ahead..
    if (findPickup || (findPickup || {})._id) return send(res, 200, { error: null, result: true });

    // check the eth usd prices every half hour..
    if (ethusd === null || (unixtime() - ethusdLastChecked) > halfHour) {
      const ethusdData = await axios.get('https://api.infura.io/v1/ticker/ethusd');
      ethusd = utils.parseEther(String(ethusdData.data.ask));
      ethusdLastChecked = unixtime();
    }

    // check gas prices every half hour
    if (gasPrice === null || (unixtime() - gasPriceLastChecked) > fiveMinutes) {
      try {
        const prices = ((await axios.get('https://ethgasstation.info/json/ethgasAPI.json')) || {}).data || {};
        gasPrice = utils.bigNumberify(((parseInt(prices.safeLow, 10) + 10) * 100000000) || '2000000000');
        gasPriceLastChecked = unixtime();
      } catch (error) {
        console.log('Eth gas station error', error);
      }
    }

    // check is Dai is being used
    const daiSelected = lower(token) === lower(daiTokenAddress);

    // fee BN
    const feeBN = utils.bigNumberify(String(fee));

    // check fee receipient
    if (lower(feeRecipient) != lower(feeCollectionAccount))
      throw new Error(`In order to use our service, the feeRecipient must be ${feeCollectionAccount}`);

    // this is where we would check gas fees.
    if (daiSelected && feeBN.lt(fourCentsOfDai)) throw new Error('Not enough Dai to pay for pickup (fee: 0.04 Dai)..');

    // handle ether fee
    if (!daiSelected && !feeBN.lt(gasPrice.mul(pickupGasUsed))) throw new Error('Not enough Ether to pay for pickup cost.');

    // split signatures
    const recipientSignatureSplit = utils.splitSignature(recipientSignature);
    const createrSignatureSplit = utils.splitSignature(creatorSignature);

    // method data
    const data = encodeMethod(pickupABI, [
      destination,
      token,
      amount,
      feeRecipient,
      fee,
      expiry,
      [
        utils.hexZeroPad(utils.bigNumberify(String(createrSignatureSplit.v)).toHexString(), 32),
        createrSignatureSplit.r,
        createrSignatureSplit.s,
        utils.hexZeroPad(utils.bigNumberify(String(recipientSignatureSplit.v)).toHexString(), 32),
        recipientSignatureSplit.r,
        recipientSignatureSplit.s,
      ],
    ]);

    // transaciton data
    const transactionData = {
      to: nickpayAddress,
      data,
      chainId: utils.getNetwork('homestead').chainId,
    };

    // estamate gas cost with infura, check invalid data..
    try {
      await eth.raw('eth_estimateGas', transactionData);
    } catch (error) {
      throw new Error('Money has already been retrieved from this transfer.');
    }

    // cache the transaction for pickup..
    const saveHash = new Pickup({
      _id, // mongo id
      d: data, // data
      a: false, // assigned
      c: new Date(), // created
    });
    await saveHash.save();

    // return true
    send(res, 200, { error: null, result: true });
  } catch (error) {
    console.log(error);
    send(res, 400, { error: error.message, result: null });
  }
};
