import { Link, Route, location, Switch } from "@hyperapp/router";
import regeneratorRuntime from "regenerator-runtime";
const { utils, Wallet, Contract, providers } = require('ethers');
import { h, app } from "hyperapp";
import axios from 'axios';
import styled from './style';
import { onGetCardNonce, buildForm } from './square';

// define initial app state
const state = {
  location: location.state,
};

// define initial actions
const actions = {
  location: location.actions,
  load: () => (state, actions) => {
    buildForm();
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
  margin-bottom: 100px;

  @media (max-width: 600px) {
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Lander = () => (state, actions) => (
  <Wrapper>
    <h2>EthNames<small>.io</small></h2>
    <p>Buy ENS names without Ether</p>

    <br /><br />

    <div style="flex: 1; display: flex; flex-direction: row; align-items: center; margin-bottom: 20px;">
      <input type="text" style="width: 40%;" placeholder="Your Name" /><b style="margin-left: 20px; font-size: 20px;">.eth</b></div>

    <div style="flex: 1; display: flex; width: 100%; margin-bottom: 20px;">
      <input style="width: 80%;" type="email" placeholder="Email" autocomplete="on" /></div>

    <div style="flex: 1; display: flex; min-height: 280px;" id="form-container">
      <div id="sq-ccbox">
        <form id="nonce-form" novalidate action="process-payment" method="post">
          <div style="display: flex; flex-direction: column; margin-bottom: 20px;">
            <div style="width: 100%;" id="sq-card-number"></div>
            <div style="display: flex; flex-direction: row; min-height: 40px;">
              <div><div id="sq-expiration-date"></div></div>
              <div style="margin-left: 20px;"><div id="sq-cvv"></div></div>
              <div style="margin-left: 20px;"><div id="sq-postal-code"></div></div>
            </div>
          </div>
          <input type="hidden" id="card-nonce" name="nonce" />

          <button id="sq-creditcard" class="button-credit-card" onclick="onGetCardNonce(event)">Pay $6.00 (USD)</button>
        </form>
      </div>
     </div>
  </Wrapper>
);

// routes for app
const Routes = () => (
  <Switch>
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
