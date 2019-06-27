import { Link, Route, location, Switch } from "@hyperapp/router";
import regeneratorRuntime from "regenerator-runtime";
const { utils, providers } = require('ethers');
const { call, HttpProvider } = require('ethjs-extras');
import { h, app } from "hyperapp";
import axios from 'axios';
import styled from './style';
import { onGetCardNonce, buildForm, getForm } from './square';

// null address
const nullAddress = '0x0000000000000000000000000000000000000000';

// Check mark
const Check = () => (
  <svg version="1.1" id="Capa_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
    <g>
      <polygon fill="green" points="211.344,306.703 160,256 128,288 211.414,368 384,176 351.703,144 	"/>
      <path fill="green" d="M256,0C114.609,0,0,114.609,0,256c0,141.391,114.609,256,256,256c141.391,0,256-114.609,256-256 C512,114.609,397.391,0,256,0z M256,472c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
    </g>
  </svg>
);

// provider for mainnet
const infuraProvider = new providers.InfuraProvider('mainnet', '7bd5971b072e46f9b6e7ac721938dacc');
const provider = new HttpProvider('https://mainnet.infura.io/v3/7bd5971b072e46f9b6e7ac721938dacc');
const available = ensName => call({
  provider,
  to: '0xF0AD5cAd05e10572EfcEB849f6Ff0c68f9700455',
  solidity: 'available(string name):(bool)',
  args: [ensName],
});
const owner = ensName => call({
  provider,
  to: '0x314159265dD8dbb310642f98f50C066173C1259b',
  solidity: 'owner(bytes32 node):(address)',
  args: [utils.namehash(ensName)],
});
const resolver = ensName => call({
  provider,
  to: '0x314159265dD8dbb310642f98f50C066173C1259b',
  solidity: 'resolver(bytes32 node):(address)',
  args: [utils.namehash(ensName)],
});

// generic done typing
let doneTyping = null;

// define initial app state
const state = {
  location: location.state,
  stage: 1,
  names: ['nickpay.eth', 'nickdodson.eth'],
};

// validate email address
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// define initial actions
const actions = {
  location: location.actions,
  load: () => (state, actions) => {
    var script = document.createElement('script');
    script.onload = function () {};
    script.src = 'https://js.squareup.com/v2/paymentform';
    document.head.appendChild(script); //or something of the likes
  },
  searchName: name => async(state, actions) => {
    try {
      if (name.indexOf(' ') !== -1) throw new Error('Invalid name');

      if ((await available(name))[0] === true
          && (await owner(name))[0] === nullAddress) {
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
    try {
      const name = String(e.target.value).trim().replace('.eth', '');

      actions.change({ nameValue: name });
      actions.change({ available: false, pending: true });
      clearTimeout(doneTyping);

      if (name.length)
        doneTyping = setTimeout(e => actions.searchName(name), 500);
    } catch (error) { console.log(error); }
  },
  emailValue: e => (state, actions) => {
    const val = e.target.value;
    clearTimeout(doneTyping);
    actions.change({ emailValue: val });

    if (val.length)
      doneTyping = setTimeout(e => actions.change({
        emailValid: validateEmail(val),
      }), 500);
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

const colors = {
  primary: 'lightblue',
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 0px auto;
  margin-top: 70px;
  margin-bottom: 100px;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

// standard route method
const route = pathname => {
  window.scrollTo(0, 0);
  history.pushState(null, "", pathname);
};

const makeProps = props => `
  display: ${props.display ? props.display : 'flex'};
  ${props.row ? 'flex-direction: row;' : ''}
  ${props.col ? 'flex-direction: column;' : ''}
  ${props.between ? 'justify-content: space-between;' : ''}
  ${props.alignCenter ? 'align-items: center;' : ''}
  ${props.pointer ? 'cursor: pointer;' : ''}
  ${props.flex ? `flex: ${props.flex};` : ''}

  ${props.fontSize ? `font-size: ${props.fontSize};` : ''}
  ${props.height ? `height: ${props.height};` : ''}
  ${props.width ? `width: ${props.width};` : ''}
  ${props.minHeight ? `min-height: ${props.minHeight};` : ''}
  ${props.minWidth ? `min-width: ${props.minWidth};` : ''}

  ${props.color ? `color: ${props.color};` : ''}
  ${props.bold ? `font-weight: bold;` : ''}

  ${props.p ? `padding: ${props.p};` : ''}
  ${props.pl ? `padding-left: ${props.pl};` : ''}
  ${props.pr ? `padding-right: ${props.pr};` : ''}
  ${props.pb ? `padding-bottom: ${props.pb};` : ''}
  ${props.pt ? `padding-top: ${props.pt};` : ''}

  ${props.ml ? `margin-left: ${props.ml};` : ''}
  ${props.mr ? `margin-right: ${props.mr};` : ''}
  ${props.mb ? `margin-bottom: ${props.mb};` : ''}
  ${props.mt ? `margin-top: ${props.mt};` : ''}
`;

// div stuff
const El = (type, moreProps) => (...args) => {
  const inner = styled[type]`
    ${props => makeProps(moreProps ? Object.assign(props, moreProps) : props)}
  `;
  if (args[0].route) args[0].onclick = () => route(args[0].route);
  return inner(...args);
}
const Div = El('div');
const H2 = El('h2');
const H3 = El('h3');
const H4 = El('h4');
const A = El('a', { pointer: "" });
const Span = El('span');
const Input = El('input');

const NextButton = styled.button`
  padding: 20px;
  margin-top: 40px;
  background-color: ${props => props.available ? colors.primary : 'lightgray'};
`;

// header
const Header = () => () => (
  <div>
    <H2 between pointer>
      <Span route="/">EthNames<small style="font-size: 15px;">.io</small></Span> <Div fontSize="20px" route="/names">My Names</Div>
    </H2>
    <p>Buy ENS names without Ether</p>

    <Div p="40px" />
  </div>
);

const Empty = () => () => (<span></span>);

const CreationNav = ({ available, next, back }) => () => (
  <Div row between mt="20px">
    <NextButton onclick={back}>Back</NextButton>
    <NextButton available={state.available} onclick={next}>Next</NextButton>
  </Div>
);

const Lander = ({ match }) => (state, actions, stage = (match.params || {}).stage) => (
  <Wrapper>
    <Header />

    {stage !== 'success' ? (<Div row between mb="40px">
      <Div pointer bold={!stage} onclick={() => route('/')}>1. Choose A Name</Div>
      <Div pointer bold={stage === 'email'} onclick={() => state.available ? route('/stage/email') : null}>2. Email</Div>
      <Div pointer bold={stage === 'payment'} onclick={() => state.available && state.emailValid ? route('/stage/payment') : ''}>3. Payment</Div>
    </Div>) : ''}

    <Route path="/" render={() => (<div>
      <form onsubmit={e => {
        e.preventDefault();
        if (state.available) route('/stage/email');
      }}>
        <Div flex="1" row alignCenter mb="20px">
        <Input type="text" id="name" oncreate={() => document
          .querySelector('#name').focus()} width="40%" placeholder="Your Name" value={state.nameValue} oninput={actions.searchValue} onblur={() => actions.change({ pending: false })} />
          <b style="margin-left: 20px; font-size: 20px;">.eth</b></Div>
      </form>

      {state.available === true && (state.nameValue || '').length
          ? (<Span row alignCenter color="green">
            <Div mr="10px">Available</Div><Check /></Span>)
          : (state.available === false && state.pending === false && (state.nameValue || '').length
              ? (<Span color="red">Unavailable</Span>) : '')}
      {state.pending === true && (state.nameValue || '').length ? (<span>Checking...</span>) : ''}

      <Div p="20px" />

      <CreationNav
        available={state.available}
        next={() => state.available ? route('/stage/email') : null}
        back={() => route('/')} />
    </div>)} />

    <Route path="/stage/email" render={() => (<div>
      <form onsubmit={e => {
        e.preventDefault();
        if (state.emailValid) route('/stage/payment');
      }}>
        <Div flex="1" mb="20px" style="width: 100%">
          <Input width="80%" type="email" id="email" oncreate={() => document
            .querySelector('#email').focus()}
            placeholder="Email" autocomplete="on" value={state.emailValue} oninput={actions.emailValue} /></Div>
      </form>

      {state.emailValid ? 'Go for it.' : ''}

      <Div p="20px" />

      <CreationNav
        available={state.emailValid && state.available}
        next={() => state.emailValid ? route('/stage/payment') : ''}
        back={() => route('/')} />
    </div>)} />

    {(match.params || {}).stage === 'payment' && state.paymentFormReady ? (
      <div oncreate={e => {
        // getForm().recalculateSize();
        getForm().focus("cardNumber");
      }}></div>
    ) : ''}

    <Route path="/stage/success" render={() => (<Div col>
      <h1>Success!!!!</h1>
      <p>Your ENS name <b>{state.nameValue}.eth</b> is being processed.. please wait a few minutes</p>

      <A mt="40px" href="#" route="/names">Goto My Names</A>
    </Div>)} />

    <Div col style={`
      ${(match.params || {}).stage === 'payment' ? 'opacity: 1; z-index: 1200;' : 'visibility: hidden; opacity: 0; z-index: 100;'}
      `} oncreate={() => buildForm(actions)}>
      <Div flex="1" minHeight="180px" id="form-container">
        <div id="sq-ccbox">
          <form id="nonce-form" novalidate action="/stage/success" method="post">
            <div style="display: flex; flex-direction: column; margin-bottom: 20px;">
              <div style="width: 100%; padding-left: 20px; padding-top: 20px;" id="sq-card-number"></div>
              <div style="display: flex; flex-direction: row; min-height: 40px;">
                <div><div id="sq-expiration-date"></div></div>
                <div style="margin-left: 20px;"><div id="sq-cvv"></div></div>
                <div style="margin-left: 20px;"><div id="sq-postal-code"></div></div>
              </div>
            </div>
            <input type="hidden" id="card-nonce" name="nonce" />
          </form>
        </div>
       </Div>

       <CreationNav
         available={state.emailValid && state.available}
         next={e => {
           onGetCardNonce(e)
           route('/stage/success');
         }}
         back={() => route('/stage/email')} />
    </Div>

  </Wrapper>
);

// for Payment button
//  onclickreal="onGetCardNonce(event)"

// my names page
const MyNames = () => (state, actions) => (
  <Wrapper>
    <Header />

    <Div col>
      {state.names.map(name => (
        <Div row between p="20px" pr="0px" pl="0px" route={`/names/${name}`}>
          <div>{name}</div><A href="#" to={`/names/${name}`}>transfer / resolve</A></Div>
      ))}

      <Div row mt="20px"><Input type="text" width="50%" placeholder="add name" p="0px" mb="20px" pb="10px" /></Div>
    </Div>

    <Route path="/names/:name" render={options => (<Div col mt="40px">
      <h2>{options.match.params.name}</h2>

      <H3 bold mt="40px">Transfer Ownership</H3>
      <Div between row><Input type="text" placeholder="Ethereum Address" /> <button>Transfer</button></Div>

      <H3 bold mt="40px">Set Resolver</H3>
      <Div between row><Input type="text" placeholder="Ethereum Address" /> <button>Set</button></Div>
    </Div>)} />
  </Wrapper>
);

// routes for app
const Routes = () => (
  <Switch>
    <Route path="/" render={Lander} />
    <Route path="/stage/:stage" render={Lander} />
    <Route path="/names/:name" render={MyNames} />
    <Route path="/names" render={MyNames} />
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
