import regeneratorRuntime from "regenerator-runtime";
import { h, app } from "hyperapp";
import { Link, Route, location, Switch } from "@hyperapp/router";
import axios from 'axios';
const ethers = require('ethers');
const { utils, Wallet, Contract, providers } = require('ethers');
const { Eth } = require('ethjs-extras');
import styled from 'hyperapp-styled-components';
const { randomBytes, secretbox } = require('tweetnacl');
const scryptAsync = require("scrypt-async");

// Set the application ID
const applicationId = "sandbox-sq0idp-EcBv5547FSK_0PlJ4Wz1rg";

const Check = () => (
  <svg version="1.1" id="Capa_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
    <g>
      <polygon fill="green" points="211.344,306.703 160,256 128,288 211.414,368 384,176 351.703,144 	"/>
      <path fill="green" d="M256,0C114.609,0,0,114.609,0,256c0,141.391,114.609,256,256,256c141.391,0,256-114.609,256-256 C512,114.609,397.391,0,256,0z M256,472c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
    </g>
  </svg>
);

// colors
const lightgray = '#E9E9E9';
const white = '#FFF';
const darker = '#A6A2A2';
const darkest = '#261E1C';
const primary = '#ED7354';
const whiteish = '#FFFFFE';
const green = '#6EDB81';
const bluegray = '#8A979D';
const grayer = '#95979C';
const blackish = '#1C1F26';

// change global style..
styled.injectGlobal`
  a {
    text-decoration: none;
    outline: none;
  }

  a:focus {
    outline: none;
  }
`;

// standard route method
const route = pathname => {
  window.scrollTo(0, 0);
  history.pushState(null, "", pathname);
};

// localmemory storage
let localMemory = {};

// scrypt memory hashing for simple passwords promisified
const scrypt = (password, salt) => new Promise((resolve, reject) => {
  try {
    scryptAsync(password, salt, {
      N: (1 << 17), // about 6 seconds per try..
      r: 8,
      p: 1,
      dkLen: 32,
      encoding: 'hex'
    }, hash => resolve(`0x${hash}`));
  } catch (error) { reject(error); } // handle error
});

// lock the box (string, string, string) => lockbox hex string
const naclLock = (passwordHex, data) => {
  // create a key from the password hash
  const key = utils.arrayify(passwordHex); // array it

  // create a nonce
  const nonce = randomBytes(secretbox.nonceLength);

  // create a box
  const box = secretbox(utils.toUtf8Bytes(data), nonce, key);

  // box plus nonce
  return utils.hexlify(utils.concat([nonce, box]));
};

// unlock the box (hex, hex) => unecnrypted data..
const naclUnlock = (passwordHex, lockBoxHex) => {
  // create a key from the password hash
  const key = utils.arrayify(passwordHex); // array it

  // box as array
  const lockBoxArray = utils.arrayify(lockBoxHex);

  // create a nonce
  const nonce = lockBoxArray.slice(0, secretbox.nonceLength);

  // box
  const box = lockBoxArray.slice(secretbox.nonceLength, lockBoxArray.length);

  // create a box
  return utils.toUtf8String(secretbox.open(box, nonce, key));
};

// localstorage
const local = window.localStorage || {
  setItem: (key, value) => Object.assign(localMemory, { [key]: value }),
  getItem: key => localMemory[key] || null,
};

// provider for mainnet
const infuraProvider = new providers.InfuraProvider('mainnet', '7bd5971b072e46f9b6e7ac721938dacc');

// window
const eth = new Eth({ provider: (window.web3 || {}).currentProvider });

// null address
const nullAddress = '0x0000000000000000000000000000000000000000';

// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
const registrarContract = new Contract('0xf0ad5cad05e10572efceb849f6ff0c68f9700455', [
  'function available(string name) public view returns (bool)',
  'function makeCommitment(string name,address owner,bytes32 secret) public view returns (bytes32)',
  'function commit(bytes32 commitment)',
  'function register(string name,address owner,uint256 duration,bytes32 secret)',
  'event NameRegistered(string name,bytes32 label,address owner,uint256 cost,uint256 expires)',
], infuraProvider);

// main ens contract
const ensContract = new Contract('0x314159265dD8dbb310642f98f50C066173C1259b', [
  'function owner(bytes32 node) external view returns (address)',
  'function resolver(bytes32 node) external view returns (address)',
], infuraProvider);

ensContract.owner(utils.namehash('nickpay.eth'))
 .then(console.log).catch(console.log);

// define initial app state
const state = {
  location: location.state,
};

let paymentForm = null;
let doneTyping;

// define initial actions
const actions = {
  location: location.actions,
  load: () => (state, actions) => {
    setTimeout(() => document.querySelector('#ensName').focus(), 1);

    if (window.ethereum || window.web3) {
      actions.change({ hasWeb3: true });
    }
  },
  getState: () => state => state,
  setup: () => (state, actions) => {

    // Create and initialize a payment form object
    paymentForm = new SqPaymentForm({
      // Initialize the payment form elements
      applicationId: applicationId,
      inputClass: 'sq-input',
      autoBuild: true,

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: 'transparent',
      }],

      applePay: {
        elementId: 'sq-apple-pay'
      },

      googlePay: {
        elementId: 'sq-google-pay'
      },


      // Initialize the credit card placeholders
      cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'Card Number'
      },
      cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
      },
      expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
      },
      postalCode: {
          elementId: 'sq-postal-code',
          placeholder: 'Postal'
      },

      // SqPaymentForm callback functions
      callbacks: {
        methodsSupported: function (methods) {
          var googlePayBtn = document.getElementById('sq-google-pay');

          if (methods.googlePay === true) {
            googlePayBtn.style.display = 'inline-block';
          }

          var applePayLabel = document.getElementById('sq-apple-pay-label');

           if (methods.applePay === true) {
             applePayBtn.style.display = 'inline-block';
             applePayLabel.style.display = 'none' ;
           }
        },

        createPaymentRequest: function () {
          var paymentRequestJson = {
              requestShippingAddress: false,
              requestBillingInfo: true,
              currencyCode: "USD",
              countryCode: "US",
              total: {
                label: "EthNames.io",
                amount: "6.00",
                pending: false
              },
              lineItems: [
                {
                  label: "Subtotal",
                  amount: "6.00",
                  pending: false
                },
              ]
            };

          return paymentRequestJson;
        },

          /*
          * callback function: cardNonceResponseReceived
          * Triggered when: SqPaymentForm completes a card nonce request
          */
          cardNonceResponseReceived: function (errors, nonce, cardData) {
            if (errors) {
                // Log errors from nonce generation to the browser developer console.
                console.error('Encountered errors:');
                errors.forEach(function (error) {
                    console.error('  ' + error.message);
                });
                alert('Encountered errors, check browser developer console for more details');
                return;
            }

            axios.post('http://localhost:3000', JSON.stringify({
              nonce,
              names: [actions.getState().nameValue],
              owner: actions.getState().ownerValue,
            }))
            .then(console.log)
            .catch(console.log);

            // alert(`The generated nonce is:\n${nonce}`);
            // Uncomment the following block to
            // 1. assign the nonce to a form field and
            // 2. post the form to the payment processing handler
            /*
            document.getElementById('card-nonce').value = nonce;
            document.getElementById('nonce-form').submit();
            */
          }
      }
    });
    paymentForm.build();
  },
  ownerAddress: e => async(state, actions) => {
    actions.change({ ownerValue: e.target.value });
  },
  searchName: name => async(state, actions) => {
    try {
      if (name.indexOf(' ') !== -1) throw new Error('Invalid name');

      if ((await registrarContract.available(name))
        && (await ensContract.owner(utils.namehash(`${name}.eth`))) === nullAddress) {
        actions.change({ available: true, pending: false });
      } else {
        actions.change({ pending: false });
      }
    } catch (error) {
      console.log(error);
      actions.change({ pending: false });
    }
  },
  searchValue: e => async (state, actions) => {
    const name = String(e.target.value).trim().replace('.eth', '');

    actions.change({ nameValue: name });
    actions.change({ available: false, pending: true });
    clearTimeout(doneTyping);

    if (name.length)
      doneTyping = setTimeout(e => actions.searchName(name), 500);
  },
  makeMeOne: e => (state, actions) => { // make a wallet
    const wallet = new Wallet(utils.hexlify(utils.randomBytes(32)));
    const ownerValue = wallet.address;

    // update wallet address
    actions.change({ ownerValue });

    // const encryptedPrivateKey = naclLock();


    // const wallet = new Wallet();
    // const setWallet = local.setItem('wallets', JSON.parse(local.getItem('wallets')))
  },
  onGetCardNonce: e => (state, acitons) => {
    // Don't submit the form until SqPaymentForm returns with a nonce
    e.preventDefault();

    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();
  },
  change: obj => obj,
};

// Not found page
const NotFound = () => (
  <div style={{ padding: '20%', 'padding-top': '100px' }}>
    <h1>Cool kids?</h1>
    <h3>Hmm... Page not found</h3>
  </div>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 0px auto;
  margin-top: 70px;
  font-family: 'Source Code Pro', monospace;
  margin-bottom: 100px;
  align-items: start;

  @media (max-width: 600px) {
    width: 80%;
    margin-top: 70px;
  }
`;

const SearchInput = styled.input`
  padding: 20px;
  font-size: 25px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: none;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;

  &:focus {
    border-bottom: 1px solid purple;
  }
`;

const Lander = () => (state, actions) => (
  <Wrapper>
    <div>
      <h1>EthNames<small style="font-size: 20px; color: purple;">.io</small></h1>
      <p>The Fastest way to get an ENS name <i>without Ether!</i></p>
    </div>

    <br /><br />

    <div style="position: relative;">
      <div>
        <div id="sq-ccbox">
          <form oncreate={e => actions.setup()} id="nonce-form" novalidate action="" method="post">
            <fieldset>
              <div style="display: flex;">
                <SearchInput type="text" tabindex="1" id="ensName" placeholder="MyName" oninput={actions.searchValue} style={`width: 30%;`} />
                <SearchInput type="text" disabled="disabled" value=".eth" style="width: 75px; font-size: 25px; border: none; background: none; padding-left: 0px;" />
                <div style="margin-bottom: 20px; width: 20%; font-size: 23px; display: flex; flex-direction: column; align-items: start; justify-content: center;">
                  {state.available === true
                      ? (<span style="display: flex; flex-direction: row; align-items: center; color: green;">
                        <div style="margin-right: 10px;">Available</div><Check /></span>)
                      : (state.available === false && state.pending === false
                          ? (<span style="color: red">Unavailable</span>) : '')}
                  {state.pending === true ? (<span>Checking...</span>) : ''}
                </div>
              </div>
            </fieldset>
            <br /><br />
            <div style={`opacity: ${state.available ? '1' : '0'};`}>
              <div style="display: flex; position: relative; flex-direction: column;">
                <SearchInput type="text" tabindex="2" placeholder="Your Ethereum Address" value={state.ownerValue} style="margin-bottom: 10px; " oninput={actions.ownerAddress} />
                {(state.hasWeb3 = false) ? (<a tabindex="-1" href="#"
                  onclick={async e => {
                    try {
                      await window.ethereum.enable();
                      const accounts = await eth.raw('eth_accounts');
                      if (!accounts.length) throw new Error('No accounts..');
                      actions.change({ ownerValue: accounts[0] });
                    } catch (error) {
                      actions.change({ result: 'Problem connect wallet :(' })
                    }
                  }}
                  style="position: absolute; right: 0px; top: 10px; text-decoration: none; background: #FFF; padding: 10px;">connect</a>)
                  : (<a href="#" tabindex="-1"
                    onclick={actions.makeMeOne}
                    style="position: absolute; right: 0px; top: 10px; text-decoration: none; background: #FFF; padding: 10px;">
                    Make me one</a>)}

                  <br /><br />
                  {state.ownerValue ? (
                    <a href="mailto:thenickdodson@gmail.com?subject=DoNotDelete">Email Yourself the Password</a>
                  ) : ''}
              </div>
            </div>
            <br /><br /><br />
            <div style={`opacity: ${(state.ownerValue || '').length > 22 ? '1' : '0'};`}>
              <label>Billing (via <a href="http://squareup.com" tabindex="-1" target="_blank">Square</a>)</label>
              <br /><br />

              <div id="sq-apple-pay-label" class="wallet-not-enabled">{state.cool ? 'Apple Pay on the Web not enabled' : ''}</div>
              <button id="sq-apple-pay"  tabindex="-1" class="button-apple-pay"></button>
              <button id="sq-google-pay" tabindex="-1" class="button-google-pay"></button>
              <fieldset>
                <div id="sq-card-number" tabindex="3"></div>
                <div class="third">
                  <div id="sq-expiration-date"></div>
                </div>
                <div class="third">
                  <div id="sq-cvv"></div>
                </div>
                <div class="third">
                  <div id="sq-postal-code"></div>
                </div>
              </fieldset>
            <br /><br />
            <div style="display: flex; flex-direction: row; align-items: start; align-items: center;">
              <input type="checkbox" style="height: 30px; width: 30px; margin-right: 20px;" />
              <div>I agree to the EthNames.io <a href="">Privacy Policy</a> and <a href="">Terms of Service</a></div>
            </div>
            <br />
            <button id="sq-creditcard" style="border-radius: 3px;" class="button-credit-card" onclick={e => actions.onGetCardNonce(e)}>Buy ENS Name $6.00</button>

          </div>
            <input type="hidden" id="card-nonce" name="nonce" />
          </form>
        </div>
      </div>
   </div>

  </Wrapper>
);

// routes for app
const Routes = () => (
  <Switch>
    <Route path="/process-payment" render={Lander} />
    <Route path="/" render={Lander} />
    <Route render={NotFound} />
  </Switch>
);

// main app
const main = app(
  state,
  actions,
  Routes,
  document.body,
);

// load main call
main.load();

// unsubscripe for routing
const unsubscribe = location.subscribe(main.location);
