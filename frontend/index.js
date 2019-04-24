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
    overflow: hidden;
    color: ${blackish};
    font-size: 16px;
    font-family: 'Work Sans', sans-serif;
    line-height: 1;
    overflow: hidden;
  }

  html, body {
    margin: 0; height: 100%; overflow: hidden;
    overflow-y: scroll;
  }

  h1 {
    color: ${blackish};
    font-size: 50px;
    font-weight: 700;
    line-height: 60px;
    margin-bottom: 20px;
  }

  h2 {
    color: ${blackish};
    font-size: 30px;
    font-weight: 700;
    line-height: 30px;
  }

  h2 {
    color: ${blackish};
    font-size: 25px;
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
  margin: 0px;
  display: flex;
  flex-direction: column;
  margin-right: 0px;
  justify-content: center;
  align-items: center;
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
`;

const Button = styled.button`
`;

const NavButton = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: ${blackish};
  font-size: 20px;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  border: 2px solid rgba(0,0,0,0);
  text-align: center;

  ${props => props.highlight ? `
    border: 2px solid ${primary};
    color: ${primary};
    margin-left: 20px;
  ` : ''}

  &:hover {
    ${props => props.highlight ? `
    background: ${primary};
    color: #FFF;
    ` : ''}
  }
`;

const NavWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-self: end;

  @media (max-width: 600px) {
    ${props => props.navOpen ? `display: flex;` : `display: none;`}
    flex-direction: column;
    justify-self: start;
    align-items: start;
    align-self: flex-start;
    margin-top: 20px;
  }
`;

const LogoImage = styled.img`
  width: 200px;
  max-height: auto;
  align-self: start;
  justify-self: start;
`;

const HeaderWrapper = styled.div`
  width: 80%;
  margin-top: 80px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: none;
    margin-top: 37px;
    width: 85%;
    padding: 20px;
  }
`;

const NavDropWrapper = styled.div`
  flex: 0;
  justify-self: flex-end;
  display: none;
  flex-direction: column;

  @media (max-width: 600px) {
    display: flex;
  }
`;

const NavDrop = () => (state, actions) => (
  <NavDropWrapper onclick={e => actions.change({ navOpen: !state.navOpen })}>
    <div style={`background: ${blackish}; width: 45px; height: 4px; margin-bottom: 7px;`}></div>
    <div style={`background: ${blackish}; width: 40px; height: 4px; margin-bottom: 7px;`}></div>
    <div style={`background: ${blackish}; width: 30px; height: 4px;`}></div>
  </NavDropWrapper>
);

const Header = props => (state) => (<HeaderWrapper>
  <a href="/" style="border: 0px; outline: 0px; margin-top: 8px;"><LogoImage src={logo} /></a>

  <NavDrop />

  <NavWrapper navOpen={state.navOpen}>
    <NavButton href="/faq">FAQ</NavButton>
    <NavButton href="https://github.com/silentcicero/ethnames" target="_blank">Github</NavButton>
    <NavButton href="/names" highlight="1">My Names</NavButton>
  </NavWrapper>
</HeaderWrapper>);

const BigInput = styled.input`
  padding: 15px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${primary};
  max-width: 150px;
  text-align: center;
  font-size: 23px;

  &:active {
    color: ${blackish};
  }

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const CheckAvailability = styled.button`
  border: 3px solid ${primary};
  padding: 10px;
  margin-top: 50px;
  padding-right: 13px;
  padding-left: 13px;
  font-weight: 700;
  text-align: center;
  background: #FFF;
  font-size: 20px;
  flex-grow: 0;
  cursor: pointer;
  color: ${primary};
`;

const LanderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  padding: 30px;

  @media (max-width: 1024px) {
    margin-top: 40px;
    flex-direction: column;
  }
`;

const LanderImage = styled.img`
  width: auto;
  max-height: 320px;
  margin-right: 100px;

  @media (max-width: 1024px) {
    max-height: 300px;
    margin-top: 10px;
    margin-bottom: 40px;
    margin-right: 0px;
  }

  @media (max-width: 600px) {
    max-height: 200px;
    margin-bottom: 30px;
    margin-right: 0px;
  }
`;

const FooterWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 100px;
  font-weight: 500;
  color: ${grayer};
  justify-content: space-between;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: inherit;
    flex-direction: column;
  }
`;

const FooterNav = styled.div`
  display: flex;
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FooterNavButton = styled.a`
  color: ${grayer};
  margin-left: 30px;
  font-weight: 500;
  text-decoration: none;

  @media (max-width: 600px) {
    margin-left: 20px;
  }
`;

const Footer = () => () => (
  <FooterWrapper>
    <div>© All Rights Reserved, EthNames.io</div>

    <FooterNav>
      <FooterNavButton href="faq">FAQ</FooterNavButton>
      <FooterNavButton href="https://github.com/silentcicero/ethnames">Github</FooterNavButton>
      <FooterNavButton href="/names">MyNames</FooterNavButton>
    </FooterNav>
  </FooterWrapper>
);

const Main = () => (state, actions, v = console.log(state)) => (
  <Wrapper>
    <Header />

    <LanderWrapper>
      <div>
      <LanderImage src={lander} />
      </div>

      <div style="max-width: 540px; margin-top: 20px; padding-left: 10px; display: flex; flex-direction: column;">
        <h1>Get a unique eth name for free</h1>
        <div sytle="display: flex; flex-direction: row; flex-wrap: wrap;">
          <BigInput type="text" placeholder="Your Name" />
          <select style="padding: 15px; letter-spacing: 2px; font-size: 23px; border: none; background: none; outline: none;">
            <option value=".nongiverof.eth">.nongiverof.eth</option>
            <option value=".giverof.eth">.giverof.eth</option>
          </select>
        </div>

        <CheckAvailability>Check Availability</CheckAvailability>
      </div>
    </LanderWrapper>

    <Footer />
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
