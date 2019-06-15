const { utils, Wallet } = require('ethers');
const axios = require('axios');
const { call, Eth, balanceOf, onReceipt, solToABI, encodeMethod } = require('ethjs-extras');

// configuration settings
const {
  nickpayAddress,
  infuraMainnetURL,
  daiTokenAddress,
  serviceEmail,
  privateKey,
  connect,
  sendMail,
  eth,
  pickupABI,
  multisendABI,
  noMultiOrUpsert,
  multiSendAddress,
} = require('./config');

// utility functions
const {
  noop,
  lower,
  unixtime,
  halfHour,
  fiveMinutes,
  one,
  gasLimit,
  oneEther,
  oneDai,
  fourCentsOfDai,
  wait,
} = require('./utils');

// gas prices
let gasPrice = utils.bigNumberify('3000000000'); // set to 3 gwei..
let gasPriceLastChecked = unixtime();

// acid assumtions
let pickupsProcessed = [];
let lastTransactionHash = '';
let lastSuccess = unixtime();

// wallet for transactions
const wallet = new Wallet(privateKey);

// process transactions
const processPickups = async () => {
  try {
    // wait a second, work in 3 second intervals to slow things down a bit..
    await wait(10000);

    // connect mongo, should be instant..
    const { Pickup } = await connect();

    // get the oldest unassigned pickups, limit to how many processors there are times 2, just incase some are being worked on..
    // filter out any pickups that are being processed at the moment (using local memory)
    const oldestPickups = (await Pickup.find({ a: false })
      .sort({ c: 1 }) // get the oldest created by
      .limit(25).lean().exec())
      .filter(pickup => pickupsProcessed.indexOf(pickup._id) === -1); // pickup not in local pickups..

    // wait if transaciton doesn't have a receipt
    if (lastTransactionHash && lastTransactionHash !== '') {
      // check for receipt
      const receipt = await eth.raw('eth_getTransactionReceipt', lastTransactionHash);

      // if process is too old give up on the transaction
      if (receipt || lastSuccess - unixtime() > fiveMinutes * 4) lastTransactionHash = null;

      // if there is no receipt for this transaction, we need to wait for this tx to process or timeout in 20..
      if (!receipt) return await processPickups();

      // receipt processed
      console.log('Last transaction receipt detected: ', JSON.stringify(receipt, null, 2));
    }

    // if no pickups than restart process..
    if (!oldestPickups.length && !lastTransactionHash)  return await processPickups();

    // detected pickups
    console.log('Pickups detected: ', oldestPickups.length, oldestPickups.map(p => p._id));

    // check gas prices every five minutes..
    if (gasPrice === null || (unixtime() - gasPriceLastChecked) > fiveMinutes) {
      try {
        const prices = ((await axios.get('https://ethgasstation.info/json/ethgasAPI.json')) || {}).data || {};
        gasPrice = utils.bigNumberify(((parseInt(prices.safeLow, 10) + 10) * 100000000) || '2000000000');
        gasPriceLastChecked = unixtime();
      } catch (error) {
        console.log('Eth gas station error', error); // dont stop if gas doesn't function..
      }
    }

    // get balance of the current wallet account
    const balance = await eth.balanceOf(wallet.address);

    // if balance is low throw
    if (balance.lt(gasPrice.mul(gasLimit))) {
      console.log('Gas too low!! (balance, price, limit)', balance.toString(10), gasPrice.toString(10), gasLimit.toString(10));

      // send out email to receipient..
      await sendMail({
        to: 'thenickdodson@gmail.com',
        from: serviceEmail,
        subject: `NickPay Balance Too Low!!`,
        html: `<div>
          <h2>Balance too Low on Pickup Processor</h2>

          Address: ${wallet.address}

          <br /><br />

          Balance: ${balance.toString(10)}

          <br /><br />

          Gas Price: ${gasPrice.toString(10)}

          <br /><br />

          Gas Limit: ${gasLimit.toString(10)}
        </div>`,
      });

      await wait(144000); // 4 hours

      // run process again..
      return await processPickups();
    }

    // get nonce
    const nonce = utils.bigNumberify(await eth.raw('eth_getTransactionCount', wallet.address, 'latest'));

    // transaction hash
    let transactionObject;

    // oldest pickup length..
    if (oldestPickups.length >= 1) {
      // build mulisend method..
      const data = encodeMethod(multisendABI, [
        '110000', // 110k in gas limit, a litte more than usual..
        nickpayAddress, // send to nickpay processor
        '0', // the tx value is zero
        '356', // 356 bytes which will encode to hex..
        oldestPickups.length, // the number of pickups
        `0x${oldestPickups.map(pickup => String(pickup.d).slice(2)).join('')}`, //  build transactions data with pickups
      ]);

      // multisend for multiple pickups at once..
      transactionObject = {
        to: multiSendAddress, // multisend..
        data,
      };
    }

    // if there is no transaction run process again..
    if (!transactionObject) return await processPickups();

    // transaciton object with gas and nonce, chain id etc..
    const transactionObjectWithGas = Object.assign({
      nonce,
      gasLimit,
      gasPrice,
      chainId: utils.getNetwork('homestead').chainId,
    }, transactionObject);

    // might want to check each transaciton one more time before it gets batch send

    // transaction hash is now this..
    lastTransactionHash = await eth.raw('eth_sendRawTransaction', await wallet.sign(transactionObjectWithGas));

    // update pickups processed locally, for ACID like assurance
    const pickupsJustProcessed = oldestPickups.map(pickup => pickup._id);
    pickupsProcessed = pickupsProcessed.concat(pickupsJustProcessed);

    // update the pickups database..
    await Pickup.update({ _id: { $in: pickupsJustProcessed }}, {
      $set: { d: '', a: true }, // remove data and assign to true
    }, noMultiOrUpsert);

    // process run
    console.log('Pickups processed (total pickups, tx hash, pickups):', pickupsProcessed.length, lastTransactionHash, pickupsJustProcessed);

    // run pickups process again..
    return await processPickups();
  } catch (error) {
    console.log('Process error', error);

    // run pickups process again..
    return await processPickups();
  }
};

// app for npm
var APP = {
  init: function() {
    // init started
    console.log('Pickup processing started...');

    // process txs recursivly
    processPickups();
  }
};

// init
(function(){
  APP.init();
})();
