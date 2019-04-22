import regeneratorRuntime from "regenerator-runtime";
import { h, app } from "hyperapp";
import { Link, Route, location, Switch } from "@hyperapp/router";
import axios from 'axios';
const ethers = require('ethers');
const { utils, Wallet } = require('ethers');
const { sendTransaction, balanceOf, call, Eth, onReceipt } = require('ethjs-extras');
import styled from 'hyperapp-styled-components';
import moment from 'moment';

const favicon = require('./public/Favicon.svg');
const lander = require('./public/lander.png');
const logo = require('./public/logo.svg');

const stripHex = v => String(v).indexOf('0x') === 0 ? String(v).slice(2) : v;
const trimHexPrefix = val => String(val).indexOf('0x') === 0 ? String(val).slice(2) : val;

// no operation
const noop = () => {};
const noop1 = v => v;

// null token address
const nullAddress = '0x0000000000000000000000000000000000000000';

// who will get the fee
const feeRecipient = '0x0000000000000000000000000000000000000000';

// shorthand
const keccak256 = utils.keccak256;
const encodePacked = utils.solidityPack;
const abiEncode = encodePacked;

// server url
const serverURL = 'https://api.nickpay.com';

// json params for axios
const post = (url, data) => axios.post(serverURL + url, JSON.stringify(data));

// lower case it
const lower = v => String(v).toLowerCase();

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
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: 400;
    font: inherit;
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    vertical-align: baseline;
    font-family: 'Work Sans', sans-serif;
  }

  input {
    letter-spacing: 1.2px;
  }

  body {
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    color: ${blackish};
    font-size: 16px;
    font-family: 'Work Sans', sans-serif;
  }

  h1 {
    color: ${blackish};
    font-size: 35px;
    font-weight: 700;
    line-height: 42px;
  }

  h2 {
    color: ${blackish};
    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
  }

  h2 {
    color: ${blackish};
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
  }

  p {
    color: ${blackish};
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }

  small {
    color: ${blackish};
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  }

  b {
    font-weight: 700;
  }

  a {
    color: ${primary};
    text-decoration: underline;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    line-height: 27px;
  }
`;

// standard route method
const route = pathname => {
  window.scrollTo(0, 0);
  history.pushState(null, "", pathname);
};

// define initial app state
const state = {
  location: location.state,
  errors: [],
};

var editor;

// localmemory storage
let localMemory = {};

// localstorage
const local = window.localStorage || {
  setItem: (key, value) => Object.assign(localMemory, { [key]: value }),
  getItem: key => localMemory[key] || null,
};

// define initial actions
const actions = {
  location: location.actions,
  load: () => (state, actions) => {},
  change: obj => obj,
};

// provider
let provider = window.ethereum || (window.web3 || {}).currentProvider;

// provider..
const eth = Eth({ provider });

// Not found page
const NotFound = () => (
  <div style={{ padding: '20%', 'padding-top': '100px' }}>
    <h1>Cool kids?</h1>
    <h3>Hmm... Page not found</h3>
  </div>
);

const Wrapper = styled.div`
  padding: 0px;
`;

const InputSmall = styled.input`
  background-color: #FFFFFF;
  border: 2px solid #E9E9E9;
  color: #8A979D;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
  outline: none;
  min-height: 30px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;

  &:focus {
    border: 2px solid #261E1C;
    color: #261E1C;
    outline: none;
  }

  ${props => props.error ? `
    border: 2px solid #ED7354;
    color: #ED7354;
  ` : ''}
  }
`;

const Button = styled.button`
`;

const Nav = styled.div`
`;

const Main = () => (state, actions, v = console.log(state)) => (
  <Wrapper>
    Hello world!

    <br /><br />

    <InputSmall />
  </Wrapper>
);

// routes for app
const Routes = () => (
  <Switch>
    <Route path="/" render={Main} />
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
