import regeneratorRuntime from "regenerator-runtime";
import { h, app } from "hyperapp";
import { Link, Route, location, Switch } from "@hyperapp/router";
import axios from 'axios';
const ethers = require('ethers');
const { utils, Wallet, Contract, providers } = require('ethers');
const { sendTransaction, balanceOf, call, Eth, onReceipt } = require('ethjs-extras');
import styled from 'hyperapp-styled-components';
import moment from 'moment';

// Set the application ID
const applicationId = "sandbox-sq0idp-EcBv5547FSK_0PlJ4Wz1rg";

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

// standard route method
const route = pathname => {
  window.scrollTo(0, 0);
  history.pushState(null, "", pathname);
};

// localmemory storage
let localMemory = {};

// localstorage
const local = window.localStorage || {
  setItem: (key, value) => Object.assign(localMemory, { [key]: value }),
  getItem: key => localMemory[key] || null,
};

// provider for mainnet
const infuraProvider = new providers.InfuraProvider('mainnet', '7bd5971b072e46f9b6e7ac721938dacc');

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
  },
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
              names: [state.nameValue],
              owner: state.ownerValue,
            })).then(console.log).catch(console.log);

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
        actions.change({ available: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
  searchValue: e => async (state, actions) => {
    const name = String(e.target.value).trim().replace('.eth', '');

    actions.change({ nameValue: e.target.value });
    actions.change({ available: false });
    clearTimeout(doneTyping);

    if (name.length)
      doneTyping = setTimeout(e => actions.searchName(name), 500);
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
  width: 60%;
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
  font-size: 16px;
  border-radius: 3px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: none;
  border: 1px solid;
  border-color: lightgray;
  outline: none;

  &:focus {
    border: 1px solid purple;
  }
`;

const Lander = () => (state, actions) => (
  <Wrapper>
    <div>
      <h1>EthNames</h1>
      <p>Fastest way to get an ENS name without Ether</p>
    </div>

    <br /><br />

    <div>
      <div id="form-container">
        <div id="sq-ccbox">
          <form oncreate={e => actions.setup()} id="nonce-form" novalidate action="" method="post">
            <fieldset>
              <div style="display: flex;">
                <SearchInput type="text" id="ensName" placeholder="MyName" oninput={actions.searchValue} style="width: 80%;" />
                <SearchInput type="text" disabled="disabled" value=".eth" style="width: 20%; font-weight: bold;" />
              </div>
              {state.available === true ? (<span style="color: green">Available!</span>) : (state.available === false ? (<span style="color: red">Unavailable :(</span>) : '')}
            </fieldset>
            <br /><br />
            <div style={`opacity: ${state.available ? '1' : '.3'};`}>
              <label>Ownership</label><br /><br />
              <fieldset>
                <div style="display: flex; position: relative; flex-direction: column;">
                  <SearchInput type="text" placeholder="0x...Your..Address.." style="margin-bottom: 10px;" oninput={actions.ownerAddress} />
                  <a href="#" style="position: absolute; right: 20px; top: 10px; text-decoration: none; background: #FFF; padding: 10px;">connect</a>
                  <a href="#" style="text-decoration: none;">Make me one</a>
                </div>
              </fieldset>
            </div>
            <br /><br /><br />
            <div style={`opacity: ${(state.ownerValue || '').length ? '1' : '.3'};`}>
              <label>Billing Information (via <a href="http://squareup.com" target="_blank">Square</a>)</label><br /><br />
              <fieldset>
                <div id="sq-card-number"></div>
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
            <fieldset>
              <input type="checkbox" /> I agree to the EthNames.io <a href="">Privacy Policy</a> and <a href="">Terms of Service</a>
            </fieldset>
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
