import regeneratorRuntime from "regenerator-runtime";
import { h, app } from "hyperapp";
import { Link, Route, location, Switch } from "@hyperapp/router";
import axios from 'axios';
const ethers = require('ethers');
const { utils, Wallet, providers } = require('ethers');
const { sendTransaction, balanceOf, call, Eth, onReceipt } = require('ethjs-extras');
import styled from 'hyperapp-styled-components';
import moment from 'moment';

// setup infura provider mainnet
const provider = new providers.InfuraProvider("homestead", "942ac122c104479cab942a562071d460");

const favicon = require('./public/Favicon.svg');
const lander = require('./public/lander.png');
const logo = require('./public/logo.svg');
const downArrow = require('./public/downArrow.svg');

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
    overflow-y: auto;
  }

  iframe {
    opacity: 0;
  }

  html {
    overflow-y: hidden;
  }

  h1 {
    color: ${blackish};
    font-size: 55px;
    font-weight: 700;
    line-height: 60px;
    margin-bottom: 35px;
  }

  h2 {
    color: ${blackish};
    font-size: 30px;
    font-weight: 700;
    line-height: 30px;
  }

  h3 {
    color: ${blackish};
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
  }

  select {
    -webkit-appearance: none;
    appearance: none;
  }

  /* This is to remove the arrow of select element in IE */
  select::-ms-expand {	display: none; }
  select{
      -webkit-appearance: none;
      appearance: none;
      outline: 0;
      border: 0;
  }

  select:-moz-focusring {
    color:transparent;
    text-shadow:0 0 0 #000; /* your normal text color here */
  }
  select:-moz-focusring * {
    color:#000; /* your normal text color here */
    text-shadow:none;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  option::-moz-focus-inner {
    border: 0;
  }

  @-moz-document url-prefix() {
    select {
      -moz-appearance: none;
      text-indent: 0.01px;
      text-overflow: "";
    }
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
  name: '',
  domain: '.nongiverof.eth',
  errors: [],
  step: 3,
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
  load: () => (state, actions) => {
    try {
      setTimeout(e => { document.querySelector('.grecaptcha-logo').style.opacity = '0'; }, 300);

      // detect is ios
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      // is mobile
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // is firefox
      const firefox = /fire|firefox|Firefox/i.test(navigator.userAgent);

      actions.change({ ios, mobile, firefox });

      /*
  		grecaptcha.ready(function() {
        try {
    			grecaptcha
          .execute('6LcRdKAUAAAAANRnGKb6IU-Kq8d4FdojGbA7uV45', {action: 'homepage'})
          .then(function(token) {
    			});
        } catch (erorr) {}
  		});
      */
    } catch (err) {
    }
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
    text-decoration: underline;
  }

  @media (max-width: 900px) {
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const NavWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-self: end;

  @media (max-width: 900px) {
    ${props => props.navOpen ? `display: flex;` : `display: none;`}
    flex-direction: column;
    width: 100%;
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

  @media (max-width: 900px) {
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

  @media (max-width: 900px) {
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

const StepsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  color: ${primary};
`;

const StepsNumber = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 3px solid ${primary};
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;

  ${props => props.current === parseInt(props.step, 10) ? `
    background: ${primary};
    color: #FFF;
  ` : ''}

  @media (max-width: 600px) {
    ${props => props.current > parseInt(props.step, 10) ? `
    text-decoration: line-through;
    ` : ''}
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  margin-right: 20px;
`;

const StepText = styled.div`
  ${props => props.current > parseInt(props.step, 10) ? 'text-decoration: line-through;' : ''}

  @media (max-width: 600px) {
    ${props => props.current === parseInt(props.step, 10) ? 'display: flex;' : 'display: none;'}
  }
`;

const selStep = state => ({ '/accessibility': 1, "/wallet": 2, "/verify": 3, "/success": 4 })[(state.location || {}).pathname] || 1;

const NavSteps = () => (state, actions, v = console.log(state)) => (
  <StepsWrapper>
    <Step><StepsNumber current={selStep(state)} step="1">1</StepsNumber> <StepText current={selStep(state)} step="1">Availability</StepText></Step>
    <Step><StepsNumber current={selStep(state)} step="2">2</StepsNumber> <StepText current={selStep(state)} step="2">Wallet</StepText></Step>
    <Step><StepsNumber current={selStep(state)} step="3">3</StepsNumber> <StepText current={selStep(state)} step="3">Verify</StepText></Step>
    <Step><StepsNumber current={selStep(state)} step="4">4</StepsNumber> <StepText  current={selStep(state)} step="4">Success</StepText></Step>
  </StepsWrapper>
);

const Header = props => state => (<HeaderWrapper>
  <a href="/" style="border: 0px; outline: 0px; margin-top: 8px;"><LogoImage src={logo} /></a>

  <NavDrop />

  {props.steps ? (<NavSteps />) : (
  <NavWrapper navOpen={state.navOpen}>
    <NavButton href="/faq">FAQ</NavButton>
    <NavButton href="https://github.com/silentcicero/ethnames" target="_blank">Github</NavButton>
    <NavButton href="/names" highlight="1">My Names</NavButton>
  </NavWrapper>)}
</HeaderWrapper>);

const CheckAvailability = styled.button`
  border: 2px solid ${primary};
  padding: 10px;
  margin-top: 50px;
  padding-right: 30px;
  padding-left: 30px;
  font-weight: bold;
  text-align: center;
  background: #FFF;
  letter-spacing: .8px;
  font-size: 24px;
  flex-grow: 0;
  cursor: pointer;
  color: ${primary};
  outline: 0;
  display: flex;
  align-items: center;

  ${props => props.checked && props.available ? `
    border-color: ${green};
    color: ${green};
  ` : ``}

  ${props => props.checked && !props.available ? `
    border-color: yellow;
    color: yellow;
  ` : ``}

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const LanderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 120px;
  margin-bottom:50px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  width: 80%;

  @media (max-width: 1024px) {
    margin-top: 40px;
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }

  /* ----------- Non-Retina Screens ----------- */
  @media screen
    and (min-device-width: 1000px)
    and (max-device-width: 1280px)
    and (-webkit-min-device-pixel-ratio: 1) {
    margin-bottom: 70px;

    & h1 {
      font-size: 50px;
    }
  }

  /* ----------- Non-Retina Screens ----------- */
  @media screen
    and (min-device-width: 1290px)
    and (max-device-width: 1440px)
    and (-webkit-min-device-pixel-ratio: 1) {
    margin-bottom: 30px;

    & h1 {
      font-size: 50px;
    }
  }

  @media (max-width: 600px) {
    width: inherit;

    & h1 {
      font-size: 50px;
    }
  }
`;

const LanderImage = styled.img`
  height: auto;
  width: auto;
  max-width: 700px;
  margin-right: 100px;
  margin-left: 40px;

  @media (max-width: 1324px) {
    max-width: 400px;
    margin-right: 50px;
  }

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 600px) {
    display: block;
    max-width: 300px;
    margin: 0px;
    margin-bottom: 60px;
  }
`;

const FooterWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  color: ${grayer};
  justify-content: space-between;
  margin-top: 110px;

  & a {
    font-size: 22px;
  }

  /* ----------- Non-Retina Screens ----------- */
  @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1440px)
    and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: 50px;
  }

  /* ----------- Retina Screens ----------- */
  @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1440px)
    and (max-device-height: 900px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (min-resolution: 192dpi) {
    margin-top: 100px;
  }

  /* ----------- Retina Screens ----------- */
  @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1440px)
    and (min-device-height: 901px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (min-resolution: 192dpi) {
    margin-top: 200px;
  }

  /* ----------- Retina Screens ----------- */
  @media screen
    and (min-device-width: 768px)
    and (max-device-width: 1024px) {
    margin-top: 150px;
  }

  @media (max-width: 600px) {
    width: inherit;
    flex-direction: column-reverse;
    margin-top: 40px;
    margin-bottom: 100px;
    font-size: 20px;
  }
`;

const FooterNav = styled.div`
  display: flex;
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const FooterNavButton = styled.a`
  color: ${grayer};
  margin-left: 30px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    margin-left: 20px;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const FooterBody = styled.div`
  @media (max-width: 600px) {
    width: 80%;
    margin-top: 20px;
    text-align: center;
  }
`;

const BigInput = styled.input`
  padding: 15px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${primary};
  max-width: 150px;
  text-align: left;
  font-size: 23px;
  line-height: 23px;
  flex: 1;

  ${props => props.checked && props.available ? `border-color: ${green}` : ''}

  &::placeholder {
    text-align: center;
  }

  &:active {
    color: ${blackish};
  }

  @media (max-width: 600px) {
    max-width: 100%;

    &::placeholder {
      text-align: left;
    }
  }
`;

const DownArrow = styled.img`
  margin-right: 20px;
  z-index: 10000;
  background: #FFF;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  border-right: #FFF solid 20px;

  & select {
    flex: 1;
    z-index: 9000;
    padding: 15px;
    letter-spacing: 2px; font-size: 23px;
    border: none; background: none; outline: none;
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    margin-top: 20px;

    & select {
      font-size: 30px;
      padding-left: 0px;
    }
  }
`;

const Footer = () => () => (
  <FooterWrapper>
    <FooterBody>© All Rights Reserved, EthNames.io</FooterBody>

    <FooterNav>
      <FooterNavButton href="/terms">Terms</FooterNavButton>
      <FooterNavButton href="/terms">Privacy</FooterNavButton>
      <FooterNavButton href="/names" style="margin-right: 20px;">MyNames</FooterNavButton>
    </FooterNav>
  </FooterWrapper>
);

const InnerLanderWrapper = styled.div`
  margin-top: 0px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding-left: 0px;
  }
`;

actions.checkAvailable = obj => async (state, actions) => {
  if ((obj.name && (obj.name !== state.name)) || (obj.domain && (obj.domain !== state.domain)))
    actions.change({ loadingName: true, checked: false, available: false, address: 1 });

  // goto next step
  if (!state.address && obj.go) return route('/wallet');

  actions.change(obj);

  const ovState = Object.assign(state, obj);

  if (ovState.name.length == 0) return actions.change({ checked: false, loadingName: false });

  try {
    // resolve ens name
    const address = await provider.resolveName(`${ovState.name}${ovState.domain}`);
    actions.change({ loadingName: false });

    if (address === null) {
      actions.change({ checked: true, available: true, loadingName: false, address });
    } else {
      actions.change({ checked: true, available: false, loadingName: false, address });
    }
  } catch (error) {}
};

const checkmark = require('./public/done.svg');

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const Lander = () => (state, actions, v = console.log(state)) => (
  <Wrapper>
    <Header />

    <LanderWrapper>
      <div>
        <LanderImage src={lander} />
      </div>

      <div style="">
        <h1 style="max-width: 500px;">Get a unique ens name for free</h1>
        <InputWrapper oncreate={e => document.getElementById('ethName').focus()} style="">
          <BigInput type="text"
            id="ethName"
            placeholder="Your Name"
            checked={state.checked && state.name.length}
            available={state.available}
            onblur={e => actions.checkAvailable({ name: e.target.value })}
            onkeyup={e => actions.checkAvailable({ name: e.target.value })} />
          <SelectWrapper>
            <select id="domain"
              onblur={e => actions.checkAvailable({ domain: e.target.value })}
              oninput={e => actions.checkAvailable({ domain: e.target.value })}>
              <option value=".nongiverof.eth">.nongiverof.eth</option>
              <option value=".giverof.eth">.giverof.eth</option>
            </select>
            <DownArrow src={downArrow} />
          </SelectWrapper>
        </InputWrapper>

        <div><CheckAvailability
          onclick={e => actions.checkAvailable({ go: true })}
          checked={state.checked && state.name.length}
          available={state.available}>{
          state.checked && state.name.length ? (state.available ? (<div style="display: flex; align-items: center;">It's Available! <img src={checkmark} style="width: 20px; height: 20px; margin-left: 12px;" /></div>) : "Not Available :(") : 'Check Availability'
        }

        {state.loadingName && !state.available ? (<svg style="margin-left: 12px;" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling">
          <circle cx="50" cy="50" fill="none" ng-attr-stroke={primary} ng-attr-stroke-width="27" ng-attr-r="10" stroke={primary} stroke-width="13" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(44.8398 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.8s" begin="0s" repeatCount="indefinite"></animateTransform>
          </circle>
        </svg>) : ''}

        </CheckAvailability></div>
      </div>
    </LanderWrapper>

    <Footer />
  </Wrapper>
);

const VerifyWrapper = styled.div`
  width: 50%;
  display: flex;
  margin-bottom: 200px;
  flex-direction: column;
  margin-top: 200px;


  /* ----------- Non-Retina Screens ----------- */
  @media screen
    and (min-device-width: 1024px)
    and (max-device-width: 1199px)
    and (-webkit-min-device-pixel-ratio: 1) {
    width: 70%;
  }

  /* ----------- Non-Retina Screens ----------- */
  @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1440px)
    and (-webkit-min-device-pixel-ratio: 1) {
    width: 70%;
  }

  /* ----------- Retina Screens ----------- */
  @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1440px)
    and (max-device-height: 900px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (min-resolution: 192dpi) {
  }

  /* ----------- Retina Screens ----------- */
  @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1440px)
    and (min-device-height: 901px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (min-resolution: 192dpi) {
  }

  @media (max-width: 600px) {
    width: 85%;
    margin-bottom: 50px;
    margin-top: 50px;
  }
`;

const VerifyRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const VerifyRowItem = styled.div`
  ${props => props.left ? 'width: 40%;' : 'width: 60%; padding-left: 50px;'}

  @media (max-width: 600px) {
    ${props => props.left ? 'width: 100%;' : `
    width: inherit;
    padding-left: 0px;
    margin-top: 30px;
    `}
  }
`;

const VerifyButton = styled.button`
  font-size: 23px;
  cursor: pointer;
  background: #FFF;
  padding-top: 15px;
  padding-right: 27px;
  padding-left: 27px;
  padding-bottom: 15px;
  font-weight: 700;
  max-width: 300px;
  outline: none;

  &:hover {
    ${props => props.ready ? `
    outline: none;
    text-decoration: underline;
    ` : ''}
  }

  ${props => props.ready ? `
  border: 3px solid ${primary};
  color: ${primary};
  ` : `
  border: 3px solid ${lightgray};
  color: ${grayer};
  `}
`;

var checkInterval;

actions.intervalCheck = () => (state, actions) => {
  checkInterval = setInterval(actions.enable, 100);
};

actions.enable = e => async (state, actions) => {
  try {
    console.log(window.ethereum);

    if (!window.ethereum) return;

    actions.change({ ethereumAvailable: true });

    const enabled = await window.ethereum.enable();

    const accounts = await Eth({ provider: window.web3.currentProvider }).raw('eth_accounts');

    clearInterval(checkInterval);

    if (accounts.length) {
      actions.change({ accounts });

      route('/verify');
    } else {
      actions.change({ error: 'No accounts found.' });
    }
  } catch (error) {
    actions.change({ error: 'Error while getting accounts.' });
  }
};

const isFirefox = (navigator.userAgent || {}).toLowerCase().indexOf('firefox') > -1;


const WalletContainer = () => (state, actions) => (
  <Wrapper>
    <Header steps="1" />

    <VerifyWrapper >

      <VerifyRow>
        <VerifyRowItem left="1">
          <h2 style="margin-bottom: 20px;">{(typeof window.ethereum === "undefined" || state.ethereumAvailable) ? (<span>Install A Wallet</span>) : (<span>Connect Your Wallet</span>)}</h2>
          <p style="font-size: 20px;">Please connect a browser-based Ethereum wallet such as <a href="https://metamask.io/" style="font-size: 20px;">MetaMask</a> or <a href="https://trustwallet.com/" style="font-size: 20px;">TrustWallet</a>.</p>
        </VerifyRowItem>
        <VerifyRowItem style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; position: relative;">
          {(typeof window.ethereum !== "undefined" || state.ethereumAvailable) ? (
            <VerifyButton ready="1" onclick={actions.enable}>Connect MetaMask</VerifyButton>
          ) : (
          <div style="position: relative;">
            <a oncreate={e => actions.intervalCheck()} href={isFirefox ? 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/' : 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'} style="outline: none;" target="_blank">
              <img src="http://airdrop-review.com/wp-content/uploads/2018/05/metamask.png" width="300" />
            </a>

            <a href="/wallet" style="position: absolute; bottom: -40px; left: 0px; text-align: center; right: 0px; text-decoration: none;">Refresh</a>
          </div>
          )}
        </VerifyRowItem>
      </VerifyRow>

    </VerifyWrapper>

    <Footer />
  </Wrapper>
);

const HandleInput = styled.input`
  height: 30px;
  font-weight: 500;
  border: 3px solid ${lightgray};
  outline: none;
  font-size: 18px;
  padding: 13px;

  ${props => props.ready ? `
    border-color: ${blackish};
    color: ${blackish};
  ` : ''}

  ${props => props.at ? `
  background: ${lightgray};
  border-right: 0px;
  text-align: center;
  ` : 'width: 100%;'}

  ${props => props.ready && !props.at ? `
    border-left: 0px;
  ` : ''}

  ${props => props.ready && props.at ? `
    background: #FFF;
    padding-right: 16px;
    color: ${blackish};
  ` : `
  `}
`;

const Verify = () => (state, actions) => (
  <Wrapper>
    <Header steps="1" />

    <VerifyWrapper>

      <VerifyRow notThere="1">
        <VerifyRowItem left="1">
          <h2 style="margin-bottom: 20px;">Verify Yourself</h2>
          <p style="font-size: 20px;">Enter a <b>Twitter handle</b> and we will send you a Special Code through a <b>Direct Message (DM)</b>.</p>
        </VerifyRowItem>
        <VerifyRowItem style="display: flex; align-items: center;">
          <HandleInput type="text" at="1" ready={state.handle ? '1' : null} value="@" style={`height: 30px; font-size: 22px; font-weight: 700; outline: none; text-select: none; flex: 1; max-width: 23px;`} readonly="readonly" />
          <HandleInput type="text" ready={state.handle ? '1' : null} oninput={e => actions.change({ handle: e.target.value })} oncreate={e => setTimeout(e => document.querySelector('#handle').focus(), 10)} id="handle" placeholder="MyTwitterHandle" />
        </VerifyRowItem>
      </VerifyRow>

      <div style="display: flex; flex-direction: row; justify-content: flex-end;">
        <VerifyButton onclick={e => route('/success')} ready={state.handle ? '1' : null}>Send Message</VerifyButton>
      </div>

    </VerifyWrapper>

    <Footer />
  </Wrapper>
);

const SuccessWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  /* ----------- Non-Retina Screens ----------- */
  @media screen
    and (min-device-width: 1024px)
    and (max-device-width: 1279px)
    and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: 140px;
  }
`;

const successImage = require('./public/success.png');

const Success = () => (state, actions) => (
  <Wrapper>
    <Header steps="1" />

    <SuccessWrapper>
      <img src={successImage} width="150" />

      <h1 style="margin-top: 40px;">Huzzah</h1>

      <p style="font-size: 30px; max-width: 600px; line-height: 40px; text-align: center; margin-top: 20px;">
        The ENS name <b>potato.giverof.eth</b> will soon resolve to <b>0x0a08...00a1</b>!!
      </p>

      <a href="/names" style="margin-top: 30px; font-size: 20px; margin-bottom: 50px;">Check the Status</a>

    </SuccessWrapper>

    <Footer />
  </Wrapper>
);

const TextWrapper = styled.div`
  width: 80%;
`;

const Terms = () => (state, actions) => (
  <Wrapper>
    <Header />

    <TextWrapper>
    </TextWrapper>

    <Footer />
  </Wrapper>
);

const Privacy = () => (state, actions) => (
  <Wrapper>
    <Header />

    <TextWrapper>
    </TextWrapper>

    <Footer />
  </Wrapper>
);

// routes for app
const Routes = () => (
  <Switch>
    <Route path="/" render={Lander} />
    <Route path="/wallet" render={WalletContainer} />
    <Route path="/verify" render={Verify} />
    <Route path="/success" render={Success} />
    <Route path="/terms" render={Terms} />
    <Route path="/privacy" render={Privacy} />
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
