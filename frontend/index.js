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

// images
const favicon = require('./public/Favicon.svg');
const lander = require('./public/lander.png');
const logo = require('./public/logo.svg');
const downArrow = require('./public/downArrow.svg');

// extras
const stripHex = v => String(v).indexOf('0x') === 0 ? String(v).slice(2) : v;
const trimHexPrefix = val => String(val).indexOf('0x') === 0 ? String(val).slice(2) : val;
const noop = () => {};
const noop1 = v => v;

// null token address
const nullAddress = '0x0000000000000000000000000000000000000000';

// who will get the fee
const feeRecipient = '0x0000000000000000000000000000000000000000';

// server url
const serverURL = 'https://api.nickpay.com';

// json params for axios
const post = (url, data) => axios.post(serverURL + url, JSON.stringify(data));

// lower case it
const lower = v => String(v).toLowerCase();

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

  html, body {
    margin: 0;
  }

  body {
    color: ${blackish};
    font-size: 20px;
    font-family: 'Work Sans', sans-serif;
    line-height: 1;
    overflow: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
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

  h1 {
    color: ${blackish};
    font-size: 56px;
    font-weight: 700;
    line-height: 60px;
    margin-bottom: 35px;
  }

  h2 {
    color: ${blackish};
    font-size: 40px;
    font-weight: 700;
    line-height: 30px;
  }

  h3 {
    color: ${blackish};
    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
  }

  p {
    color: ${blackish};
    font-size: 20px;
    font-weight: 400;
    line-height: 21px;
  }

  small {
    color: ${blackish};
    font-size: 15px;
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
    font-weight: 400;
    line-height: 27px;
  }
`;

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
  name: local.getItem('name') || '',
  domain: local.getItem('domain') || '.nongiverof.eth',
  errors: [],
  step: 3,
};

var editor;

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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 70%;

  @media (min-width: 601px) and (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 80%;
    margin-top: 70px;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 30px;
  position: relative;
  background: #FFF;
  z-index: 10001;

  @media (max-width: 600px) {
    position: fixed;
    left: 0px;
    padding-left: 10%;
    right: 0px;
    padding-right: 10%;
    top: 0px;
    flex-direction: column;
    align-items: start;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;
const HeaderImage = styled.img`
  max-height: 30px;

  @media (max-width: 600px) {
    max-height: 25px;
  }
`;
const HeaderNavWrapper = styled.div`
  display: ${props => props.usesSteps ? 'none' : 'flex'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & a {
    font-size: 20px;
    color: ${blackish};
    text-decoration: none;
    margin-left: 30px;
    font-weight: 500;
  }

  & a:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    display: ${props => props.navOpen ? 'flex' : 'none'};
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    & a {
      font-size: 28px;
      margin-bottom: 45px;
      margin-left: 0px;
    }
  }
`;
const MyNamesButton = styled.a`
  color: ${primary} !important;
  border: 3px solid ${primary};
  background: #FFF;
  padding: 13px;
  padding-right: 20px;
  padding-left: 20px;
`;

const MobileNavWrapper = styled.div`
  display: none;

  @media (max-width: 600px) {
    position: absolute;
    top: 40px;
    right: 10%;
    display: ${props => props.usesSteps ? 'none' : 'flex'};
    width: 35px;
    height: 25px;
    flex-direction: column;
    justify-content: space-between;

    & div {
      display: block;
      height: 4px;
      background: ${blackish};
    }
  }
`;
const usesSteps = state => ({ '/verify': true, '/success': true, '/wallet': true })[(state.location || {}).pathname];

const MobileNav = props => (state, actions) => (
  <MobileNavWrapper usesSteps={usesSteps(state)} onclick={() => actions.change({ navOpen: !state.navOpen })}>
    <div style="width: 100%;"></div><div style="width: 90%;"></div><div style="width: 60%;"></div>
  </MobileNavWrapper>
);

const HeaderStepsWrapper = styled.div`
  display: ${props => props.usesSteps ? 'flex' : 'none'};
  flex-direction: row;
  margin-top: 10px;
  align-items: start;
  justify-content: space-between;

  & a i {
    height: 25px;
    width: 25px;
    max-height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none !important;
    font-weight: 500;
    padding: 3px;
    border: 3px solid ${primary};
    border-radius: 50%;
    margin-right: 20px;
  }

  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 500;
    text-decoration: none;
    margin-left: 40px;
  }

  @media (max-width: 600px) {
    margin-top: 60px;
    width: 100%;

    & a {
      text-decoration: none !important;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      align-items: center;
      margin-left: 0px;
      flex: 1;
    }

    & a i {
      margin-right: 0px;
      margin-bottom: 20px;
    }
  }
`;

const Step = styled.a`
  ${props => String(props.current) === String(props.step) ? `
    text-decoration: none !important;
  ` : `

  `}

  & span {
    ${props => parseInt(props.current, 10) > parseInt(props.step, 10) ? `
      text-decoration: line-through !important;
    ` : `

    `}
  }

  & i {
    ${props => String(props.current) === String(props.step) ? `
    background: ${primary};
    color: #FFF;
    ` : ''}
  }
`;

const selectStep = state => ({ '/availability': 1, '/verify': 2, '/success': 3 })[(state.location || {}).pathname] || 0;

const Header = () => (state) => (
  <HeaderWrapper>
    <a href="/"><HeaderImage src={logo} /></a>

    <MobileNav usesSteps={usesSteps(state)} />

    <HeaderStepsWrapper usesSteps={usesSteps(state)}>
      <Step current={selectStep(state)} step="1"><i>1</i><span>Check Availability</span></Step>
      <Step current={selectStep(state)} step="2"><i>2</i><span>Verify</span></Step>
      <Step current={selectStep(state)} step="3"><i>3</i><span>Success</span></Step>
    </HeaderStepsWrapper>

    <HeaderNavWrapper usesSteps={usesSteps(state)} navOpen={state.navOpen}>
      <a href="/FAQ">FAQ</a>
      <a href="https://github.com/silentcicero/ethnames">Github</a>
      <MyNamesButton href="/names">My Names</MyNamesButton>
    </HeaderNavWrapper>
  </HeaderWrapper>
);

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 80px;
  color: ${grayer};

  & a {
    color: ${grayer};
    margin-left: 30px;
    text-decoration: none;
    font-weight: 500;
  }

  & a:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 100px;
  }
`;
const FooterNav = styled.div`
  @media (max-width: 600px) {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    width: 90%;

    & a {
      margin-left: 0px !important;
    }
  }
`;
const Footer = () => (
  <FooterWrapper>
    <div>© All rights reserved, EthNames.io</div>
    <FooterNav>
      <a href="/terms">Terms</a>
      <a href="/terms">Privacy</a>
      <a href="/names">MyNames</a>
    </FooterNav>
  </FooterWrapper>
);

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  @media (min-width: 601px) and (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    margin-top: 60px;
    margin-bottom: 60px;
    flex-direction: column;
  }
`;

const LanderImage = styled.img`
  width: 100%;

  @media (min-width: 601px) and (max-width: 1200px) {
    display: none;
  }

  @media (max-width: 600px) {
    margin-bottom: 40px;
  }
`;

// check name availabilty action
actions.checkAvailable = obj => async (state, actions) => {
  if ((obj.name && (obj.name !== state.name)) || (obj.domain && (obj.domain !== state.domain)))
    actions.change({ loadingName: true, checked: false, available: false, address: 1 });

  // goto next step
  if (!state.address && obj.go) return route('/verify');

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

const LanderInputs = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LanderColumn = styled.div`
  margin-left: 60px;
  width: 100%;

  @media (max-width: 600px) {
    margin-left: 0px;
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

const LanderHeader = styled.h1`
  @media (min-width: 601px) and (max-width: 1280px) {
    font-size: 50px;
    line-height: 55px;
  }

  @media (max-width: 600px) {
    font-size: 40px;
    line-height: 45px;
    margin-bottom: 40px;
  }
`;

const CheckAvailability = styled.button`
  border: 3px solid ${primary};
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
    font-size: 20px;
    width: 100%;
  }
`;

const checkmark = require('./public/done.svg');

const ScrollDownArrow = styled.img`
  display: none;

  @media (max-width: 600px) {
    display: inline-block;
    min-width: 40px;
    min-height: 40px
    z-index: 10000;
    padding-bottom: 100px;
    background: #FFF;
  }
`;

const Lander = () => (state, actions) => (
  <Wrapper>
    <Header />

    <ContentWrapper>
      <div><LanderImage src={lander} /></div>
      <LanderColumn>
        <a name="go"></a>
        <LanderHeader>Get a unique ens name for free</LanderHeader>
        <a href="#go" onclick={e => (e.target.style.display = 'none')} style="text-align: center; width: 100%; margin-top: 25px; display: block;">
          <ScrollDownArrow src={downArrow} />
        </a>
        <LanderInputs>
          <BigInput type="text"
            id="ethName"
            placeholder="Your Name"
            checked={state.checked && state.name.length}
            available={state.available}
            oncreate={e => setTimeout(() => document.getElementById('ethName').focus(), 100)}
            onblur={e => actions.checkAvailable({ name: String(e.target.value).trim() })}
            onkeyup={e => actions.checkAvailable({ name: String(e.target.value).trim() })} />
          <SelectWrapper>
            <select id="domain"
              onblur={e => actions.checkAvailable({ domain: e.target.value })}
              oninput={e => actions.checkAvailable({ domain: e.target.value })}>
              <option value=".nongiverof.eth">.nongiverof.eth</option>
              <option value=".giverof.eth">.giverof.eth</option>
            </select>
            <DownArrow src={downArrow} />
          </SelectWrapper>
        </LanderInputs>

        <div>
          <CheckAvailability
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

          </CheckAvailability>
        </div>
      </LanderColumn>
    </ContentWrapper>

    <Footer />
  </Wrapper>
);

const VerifyColumnText = styled.div`
  width: 50%;
  margin-left: 10%;
  margin-bottom: 150px;
`;

const VerifyColumnInput = styled.div`
  width: 50%;
  display: flex;
  margin-right: 10%;
  flex-direction: column;
  margin-left: 50px;
  margin-bottom: 150px;
  margin-top: 100px;

  @media (max-width: 600px) {
    margin-left: 0px;
  }
`;

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

const VerifyButton = styled.button`
  font-size: 20px;
  cursor: pointer;
  background: #FFF;
  padding-top: 15px;
  padding-right: 27px;
  padding-left: 27px;
  padding-bottom: 15px;
  font-weight: 700;
  max-width: 300px;
  margin-top: 40px;
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

const Verify = () => (state, actions) => (
  <Wrapper>
    <Header />

    <ContentWrapper>
      <VerifyColumnText>
        <h3 style="margin-bottom: 20px;">Verification</h3>
        <p>Please enter your <b>Twitter Handle</b> and we will send you a special verification code via a
          <b> Direct Message</b> (DM).</p>
      </VerifyColumnText>
      <VerifyColumnInput>
        {state.codeSent ? (
            <div style="display: flex; flex-direction: row;">
              <HandleInput placeholder="e.g. 109283" />
            </div>
          ) : (
            <div style="display: flex; flex-direction: row;">
              <HandleInput type="text" at="1" ready={state.handle ? '1' : null} value="@" style={`height: 30px; font-size: 22px; font-weight: 700; outline: none; text-select: none; flex: 1; max-width: 23px;`} readonly="readonly" />
              <HandleInput type="text" ready={state.handle ? '1' : null} oninput={e => actions.change({ handle: e.target.value })} oncreate={e => setTimeout(e => document.querySelector('#handle').focus(), 10)} id="handle" placeholder="MyTwitterHandle" />
            </div>
          )}
        <div sytle="display: flex; flex-direction: row;">
          {state.codeSent ? (
              <div style="display: flex; flex-direction: row;">
                <VerifyButton onclick={e => route('/success')} ready={state.handle ? '1' : null}>Next</VerifyButton>
              </div>
            ) : (
              <div style="display: flex; flex-direction: row;">
                <VerifyButton onclick={e => state.handle ? actions.change({ codeSent: true }) : ''} ready={state.handle ? '1' : null}>Send Code</VerifyButton>
              </div>
            )}
        </div>
      </VerifyColumnInput>
    </ContentWrapper>

    <Footer />
  </Wrapper>
);

const successImage = require('./public/success.png');

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Success = () => (state, actions) => (
  <Wrapper>
    <Header />

    <ContentWrapper>
      <SuccessWrapper>
        <img src={successImage} width="150" />

        <h1 style="margin-top: 40px;">Huzzah!!</h1>

        <p style="font-size: 30px; max-width: 600px; line-height: 40px; text-align: center; margin-top: 20px;">
          The ENS name <b>{state.name}{state.domain}</b> will soon resolve to <b>{state.address}</b>!!
        </p>

        <a href="/names" style="margin-top: 30px; font-size: 20px; margin-bottom: 50px;">Check the Status</a>
      </SuccessWrapper>
    </ContentWrapper>

    <Footer />
  </Wrapper>
);


// routes for app
const Routes = () => (
  <Switch>
    <Route path="/" render={Lander} />
    <Route path="/verify" render={Verify} />
    <Route path="/success" render={Success} />
    <Route path="/terms" render={Lander} />
    <Route path="/privacy" render={Lander} />
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
