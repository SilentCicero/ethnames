import styled from 'hyperapp-styled-components';

// colors
const white = '#FFF';

// change global style..
styled.injectGlobal`
  html, body, div, span, applet, object, iframe,
  h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  u, i, center,
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
    font: inherit;
    vertical-align: baseline;
  }

  a {
    text-decoration: none;
    outline: none;
  }

  input {
    border: none;
    border-bottom: 2px solid lightgray;
    font-family: Arial;
    font-size: 20px;
    padding: 0px;
    margin: 0px;
    outline: none;
    border-radius: none;
    padding: 20px;
    -webkit-writing-mode: horizontal-tb !important;
  }

  input:focus {
    outline: none;
  }

  a:focus {
    outline: none;
  }


  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, html {
    font-family: Arial;
  }

  body {
    overflow: hidden;
  }

  h2 {
    margin-bottom: 10px;
  }

  button {
    border: 0;
    padding: 20px;
    font-weight: 500;
  }

  fieldset {
    border: none;
    padding: 0px;
    margin: 0px;
  }

  #form-container {
    border: none;
    width: inherit;
  }

  .third {
  }

  .third:last-of-type {
    margin-right: 0;
  }

  /* Define how SqPaymentForm iframes should look */
  .sq-input {
    padding: 20px;
    border: none;
    border-bottom: 2px solid lightgray;
    font-family: Arial;
    padding: 0px;
    margin: 0px;
    font-size: 20px;
  }

  /* Define how SqPaymentForm iframes should look when they have focus */
  .sq-input--focus {
  }

  /* Define how SqPaymentForm iframes should look when they contain invalid values */
  .sq-input--error {
  }

  #sq-card-number {
    padding: 0px;
    margin: 0px;
    margin-bottom: 20px;
    font-size: 20px;
  }

  /* Customize the "Pay with Credit Card" button */
  .button-credit-card {
    padding: 20px;
    margin-top: 20px;
    background: lightgray;
  }

  .button-credit-card:hover {
  }

`;

export default styled;
