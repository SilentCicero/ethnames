import regeneratorRuntime from "regenerator-runtime";
import { h, app } from "hyperapp";
import { Link, Route, location, Switch } from "@hyperapp/router";
import axios from 'axios';
const ethers = require('ethers');
const { utils, Wallet, providers } = require('ethers');
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

// define initial app state
const state = {
  location: location.state,
};

let paymentForm = null;

// define initial actions
const actions = {
  location: location.actions,
  load: () => (state, actions) => {
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

            axios.post('http://localhost:3000', JSON.stringify({ nonce })).then(console.log).catch(console.log);

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

  @media (max-width: 600px) {
    width: 80%;
    margin-top: 70px;
  }
`;

const Lander = () => (state, actions) => (
  <Wrapper>
    <div>
      <div id="form-container">
        <div id="sq-ccbox">
          <form oncreate={e => actions.setup()} id="nonce-form" novalidate action="http://localhost:3000" method="post">
            <fieldset>process-payment
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
            <button id="sq-creditcard" class="button-credit-card" onclick={e => actions.onGetCardNonce(e)}>Pay $1.00</button>

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
