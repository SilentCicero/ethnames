// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../public/paymentform.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t) {
  var e = {};

  function n(i) {
    if (e[i]) return e[i].exports;
    var o = e[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  n.m = t, n.c = e, n.d = function (t, e, i) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: i
    });
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) {
      n.d(i, o, function (e) {
        return t[e];
      }.bind(null, o));
    }
    return i;
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 136);
}([function (t, e, n) {
  "use strict";

  e.a = {
    events: {
      LOAD_FORM_CONTROLLER: "loadFormController",
      REQUEST_CARD_NONCE_IF_VALID_FORM: "requestCardNonceIfValidForm",
      BUILD_STYLES_FOR_SCREEN_WIDTH: "buildStylesForScreenWidth",
      SET_POSTAL_CODE: "setPostalCode",
      BLUR_ALL_INPUTS: "blurAllInputs",
      LOAD_WALLET: "loadWallet",
      CARD_NONCE_RESPONSE_RECEIVED: "cardNonceResponseReceived",
      INPUT_EVENT_RECEIVED: "inputEventReceived",
      SET_INPUT_HEIGHT: "setInputHeight",
      PAYMENT_FORM_LOADED: "paymentFormLoaded",
      REQUEST_APPLE_PAY_CARD_NONCE: "requestApplePayCardNonce",
      RECEIVE_APPLE_PAY_CARD_NONCE: "receiveApplePayCardNonce",
      REQUEST_APPLE_PAY_MERCHANT_VALIDITY: "requestApplePayMerchantValidity",
      RECEIVE_APPLE_PAY_VALID_MERCHANT: "receiveApplePayValidMerchant",
      REQUEST_GOOGLE_PAY_CARD_NONCE: "requestGooglePayCardNonce",
      RECEIVE_GOOGLE_PAY_CARD_NONCE: "receiveGooglePayCardNonce",
      REQUEST_GOOGLE_PAY_TOKEN: "requestGooglePayToken",
      RECEIVE_GOOGLE_PAY_TOKEN: "receiveGooglePayToken",
      RECEIVE_MASTERPASS_TRANSACTION: "receiveMasterpassTransaction",
      SET_MASTERPASS_CHECKOUT_ID: "setMasterpassCheckoutId",
      REQUEST_MASTERPASS_CARD_NONCE: "requestMasterpassCardNonce"
    },
    inputEvents: {
      SUBMIT: "submit",
      EMPTY_STATE_CHANGED: "emptyStateChanged",
      FOCUS_CLASS_ADDED: "focusClassAdded",
      FOCUS_CLASS_REMOVED: "focusClassRemoved",
      ERROR_CLASS_ADDED: "errorClassAdded",
      ERROR_CLASS_REMOVED: "errorClassRemoved",
      CARD_BRAND_CHANGED: "cardBrandChanged",
      POSTAL_CODE_CHANGED: "postalCodeChanged"
    },
    inputTypes: {
      GIFT_CARD: "giftCard",
      CARD_NUMBER: "cardNumber",
      CVV: "cvv",
      EXPIRATION_DATE: "expirationDate",
      POSTAL_CODE: "postalCode"
    },
    paymentMethods: {
      GIFT_CARD: "giftCard",
      KEYED_CARD: "keyedCard",
      APPLE_PAY: "applePay",
      GOOGLE_PAY: "googlePay",
      INSTALLMENTS: "installments",
      MASTERPASS: "masterpass"
    },
    GOOGLE_PAY_JS: "https://pay.google.com/gp/p/js/pay.js"
  };
}, function (t, e, n) {
  "use strict";

  function i(t) {
    return (i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  n(18), n(19), n(15), n(23), n(13), n(11), n(102), n(50), n(45);
  var o = {},
      r = Object.prototype.hasOwnProperty;
  o.cloneObject = function (t) {
    var e = {};

    for (var n in t) {
      r.call(t, n) && (e[n] = t[n]);
    }

    return e;
  }, o.hasOwn = function (t, e) {
    return r.call(t, e);
  }, o.guid = function () {
    function t() {
      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
    }

    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
  }, o.truncate = function (t, e) {
    return t.length <= e ? t : t.substring(0, e - 1) + "…";
  }, o.isValidWindow = function (t) {
    return !!t && "object" === i(t) && "function" == typeof t.postMessage;
  }, o.isValidDocument = function (t) {
    return !!t && "object" === i(t) && !!t.body && "object" === i(t.body) && "function" == typeof t.body.appendChild;
  }, o.typeOf = function (t) {
    if (null === t) return "null";
    if (t !== Object(t)) return i(t);
    var e = Object.prototype.toString.call(t).replace(/^\[(?:function|object) |\]$/g, "").toLowerCase();
    return -1 < e.indexOf("function") ? "function" : e;
  }, o.constructorOf = function (t) {
    try {
      var e = t.constructor.toString().match(/[function|object] (\w*)/);
      if (e) return e[1];
    } catch (t) {}

    return "";
  }, o.isValidDataType = function (t, e, n, o) {
    return n instanceof o || i(n) === o.name.toLowerCase() || (window.console.error("".concat(t, " in ").concat(e, " must be of type ").concat(o.name, ".")), !1);
  }, o.logInvalidFieldsError = function (t, e) {
    var n = e.join(", ");
    window.console.error("Invalid ".concat(t, " field(s): ").concat(n));
  }, o.url = function (t, e) {
    var n = "?version=ed00de08e6";
    return e = e || {}, Object.keys(e).forEach(function (t) {
      o.hasOwn(e, t) && (n += "&" + encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
    }), encodeURI(t) + n;
  };
  var a = {
    href: "",
    protocol: "",
    host: "",
    hostname: "",
    port: "",
    pathname: "",
    search: "",
    hash: "",
    username: "",
    password: "",
    origin: "",
    toString: function toString() {
      return "";
    },
    valueOf: function valueOf() {
      return "";
    }
  };
  o.parseUrl = function (t) {
    if (!t) return a;
    var e = document.createElement("a");
    return e.href = "".concat(t), e;
  }, o.getParentLocation = function () {
    var t = window;
    return t.location === t.parent.location ? t.location : o.parseUrl(document.referrer);
  }, o.embeddingAllowed = function (t) {
    return /localhost$/.test(t.hostname) || "https:" === t.protocol;
  }, e.a = o;
}, function (t, e, n) {
  "use strict";

  function i(t) {
    return (i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function o(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function r(t, e) {
    return !e || "object" !== i(e) && "function" != typeof e ? function (e) {
      if (void 0 !== t) return t;
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }() : e;
  }

  function a(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && c(t, e);
  }

  function s(t) {
    var e = "function" == typeof Map ? new Map() : void 0;
    return (s = function s(t) {
      if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]"))) return t;
      var n;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");

      if (void 0 !== e) {
        if (e.has(t)) return e.get(t);
        e.set(t, i);
      }

      function i() {
        return function (t, e, n) {
          return (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;

            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
            } catch (t) {
              return !1;
            }
          }() ? Reflect.construct : function (t, e, n) {
            var i = [null];
            i.push.apply(i, e);
            var o = new (Function.bind.apply(t, i))();
            return n && c(o, n.prototype), o;
          }).apply(null, arguments);
        }(t, arguments, l(this).constructor);
      }

      return i.prototype = Object.create(t.prototype, {
        constructor: {
          value: i,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), c(i, t);
    })(t);
  }

  function c(t, e) {
    return (c = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function l(t) {
    return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }

  function u(t) {
    return "https://docs.connect.squareup.com/payments/sqpaymentform/sqpaymentform-overview" + (t || "");
  }

  function p(t) {
    return "https://docs.connect.squareup.com/api/paymentform" + (t || "");
  }

  n.d(e, "l", function () {
    return d;
  }), n.d(e, "a", function () {
    return h;
  }), n.d(e, "b", function () {
    return f;
  }), n.d(e, "e", function () {
    return y;
  }), n.d(e, "c", function () {
    return _;
  }), n.d(e, "n", function () {
    return b;
  }), n.d(e, "h", function () {
    return P;
  }), n.d(e, "j", function () {
    return w;
  }), n.d(e, "f", function () {
    return F;
  }), n.d(e, "g", function () {
    return x;
  }), n.d(e, "d", function () {
    return q;
  }), n.d(e, "k", function () {
    return j;
  }), n.d(e, "i", function () {
    return V;
  }), n.d(e, "m", function () {
    return U;
  }), n.d(e, "q", function () {
    return B;
  }), n.d(e, "p", function () {
    return H;
  }), n(18), n(19), n(13), n(15), n(103), n(105), n(111), n(45), n(78), n(46), n(11);

  var d = function (t) {
    function e(t) {
      var n;
      return o(this, e), (n = r(this, l(e).call(this, t || "Unknown SqError"))).name = "SqError", n;
    }

    return a(e, s(Error)), e;
  }(),
      h = function (t) {
    function e(t) {
      var n;
      return o(this, e), (n = r(this, l(e).call(this, "SqPaymentForm element with id '".concat(t, "' not found. Has the DOM finished loading?\nSee: ").concat("https://docs.connect.squareup.com/payments/sqpaymentform/sqpaymentform-setup#step-3-add-the-html-form-to-your-payment-page")))).name = "ElementNotFoundError", n;
    }

    return a(e, d), e;
  }(),
      f = function (t) {
    function e(t) {
      var n;
      return o(this, e), (n = r(this, l(e).call(this, "SqPaymentForm element with id '".concat(t, "' is not visible. Does it or a parent element have 'display:none'?")))).name = "ElementNotVisibleError", n;
    }

    return a(e, d), e;
  }(),
      y = function (t) {
    function e(t) {
      var n;
      return o(this, e), (n = r(this, l(e).call(this, "SqPaymentForm field '".concat(t, "' is invalid.")))).name = "InvalidFieldError", n;
    }

    return a(e, d), e;
  }(),
      m = function (t) {
    function e() {
      var t;
      o(this, e);
      var n = u("#requirements-and-limitations");
      return (t = r(this, l(e).call(this, "SqPaymentForm can only be embedded on sites that use HTTPS.\nSee: ".concat(n)))).name = "HttpsRequiredError", t;
    }

    return a(e, d), e;
  }(),
      v = function (t) {
    function e(t) {
      var n;
      return o(this, e), (n = r(this, l(e).call(this, "Cannot call SqPaymentForm#".concat(t, " after SqPaymentForm#destroy. Create a new SqPaymentForm instance instead.")))).name = "FormAlreadyDestroyedError", n;
    }

    return a(e, d), e;
  }(),
      g = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = u("#how-it-works-sqpaymentform-process-flow");
      return (n = r(this, l(e).call(this, "Cannot call SqPaymentForm#".concat(t, " before SqPaymentForm is ready. See: ").concat(i)))).name = "FormNotReadyError", n;
    }

    return a(e, d), e;
  }(),
      E = function (t) {
    function e() {
      var t;
      o(this, e);
      var n = p("#build");
      return (t = r(this, l(e).call(this, "SqPaymentForm#build called more than once. Did you mean to call SqPaymentForm#destroy first?\nSee: ".concat(n)))).name = "FormAlreadyBuiltError", t;
    }

    return a(e, d), e;
  }(),
      _ = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#destroy");
      return (n = r(this, l(e).call(this, "Iframe '".concat(t, "' no longer exists. Was SqPaymentForm#destroy called?.\nSee: ").concat(i)))).name = "IframeDoesNotExistError", n;
    }

    return a(e, d), e;
  }(),
      b = function (t) {
    function e() {
      var t;
      o(this, e);
      var n = p("#shippingcontactchanged");
      return (t = r(this, l(e).call(this, "validateShippingContact() has been deprecated. Please use shippingContactChanged().\nSee: ".concat(n)))).name = "ValidateShippingContactDeprecatedError", t;
    }

    return a(e, d), e;
  }(),
      I = function (t) {
    function e() {
      var t;
      return o(this, e), (t = r(this, l(e).call(this, "Only one of 'locationId' or 'accountId' can be specified."))).name = "TooManyIdsError", t;
    }

    return a(e, d), e;
  }(),
      S = function (t) {
    function e(t, n) {
      var i;
      o(this, e);
      var a = p("#configurationfields");
      return (i = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' argument must be of type '").concat(n, "'.\nSee: ").concat(a)))).name = "InvalidArgumentError", i;
    }

    return a(e, d), e;
  }(),
      C = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#configurationfields");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' argument is required.\nSee: ").concat(i)))).name = "MissingArgumentError", n;
    }

    return a(e, d), e;
  }(),
      A = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#_paymentform_functions");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' function was called with missing or invalid parameters.\nSee: ").concat(i)))).name = "InvalidFunctionArgumentError", n;
    }

    return a(e, d), e;
  }(),
      P = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#configurationfields");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' option value is invalid.\nSee: ").concat(i)))).name = "InvalidOptionError", n;
    }

    return a(e, d), e;
  }(),
      T = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#configurationfields");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' option type is invalid.\nSee: ").concat(i)))).name = "InvalidOptionType", n;
    }

    return a(e, d), e;
  }(),
      w = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#configurationfields");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' option is required.\nSee: ").concat(i)))).name = "MissingOptionError", n;
    }

    return a(e, d), e;
  }(),
      O = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#configurationfields");
      return (n = r(this, l(e).call(this, "The SqPaymentForm 'elementId' option is required for '".concat(t, "'.\nSee: ").concat(i)))).name = "MissingElementIdError", n;
    }

    return a(e, d), e;
  }(),
      N = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#configurationfields");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' option is required.\nSee: ").concat(i)))).name = "MissingInputTypeError", n;
    }

    return a(e, d), e;
  }(),
      L = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#configurationfields");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' option is not expected in this configuration.\nSee: ").concat(i)))).name = "UnexpectedInputTypeError", n;
    }

    return a(e, d), e;
  }(),
      R = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#_callbackfunctions_detail");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' callback is required.\nSee: ").concat(i)))).name = "MissingCallbackError", n;
    }

    return a(e, d), e;
  }(),
      M = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#_callbackfunctions_detail");
      return (n = r(this, l(e).call(this, "The SqPaymentForm '".concat(t, "' callback must be a function.\nSee: ").concat(i)))).name = "InvalidCallbackError", n;
    }

    return a(e, d), e;
  }(),
      k = function (t) {
    function e() {
      var t;
      o(this, e);
      var n = p("#configurationfields");
      return (t = r(this, l(e).call(this, "The SqPaymentForm requires at least one payment method.\nSee: ".concat(n)))).name = "MissingPaymentMethodError", t;
    }

    return a(e, d), e;
  }(),
      D = function (t) {
    function e() {
      var t;
      o(this, e);
      var n = p("#configurationfields");
      return (t = r(this, l(e).call(this, "The SqPaymentForm 'inputStyles' option must be an array.\nSee: ".concat(n)))).name = "InvalidInputStylesError", t;
    }

    return a(e, d), e;
  }(),
      F = function (t) {
    function e(t) {
      var n;
      o(this, e);
      var i = p("#datatype-inputstyleobjects");
      return (n = r(this, l(e).call(this, "Invalid InputStyle property: '".concat(t, "'.\nSee: ").concat(i)))).name = "InvalidInputStylePropertyError", n;
    }

    return a(e, d), e;
  }(),
      x = function (t) {
    function e(t, n) {
      var i;
      o(this, e);
      var a = p("#datatype-inputstyleobjects");
      return (i = r(this, l(e).call(this, "Invalid InputStyle value '".concat(t, "' for property '").concat(n, "'.\nSee: ").concat(a)))).name = "InvalidInputStyleValueError", i;
    }

    return a(e, d), e;
  }(),
      q = function (t) {
    function e() {
      var t;
      return o(this, e), (t = r(this, l(e).call(this, "Input height zero detected; using fallback value."))).name = "InputHeightZeroError", t;
    }

    return a(e, d), e;
  }(),
      G = function (t) {
    function e() {
      var t;
      o(this, e);
      var n = u("#prerequisites");
      return (t = r(this, l(e).call(this, "Browser not supported.\nSee: ".concat(n)))).name = "UnsupportedBrowserError", t;
    }

    return a(e, d), e;
  }(),
      j = function (t) {
    function e() {
      var t;
      return o(this, e), (t = r(this, l(e).call(this, "The label field in the 'PaymentRequest.total' object must be set " + "with the merchant name to use Apple Pay with an Account ID.\nSee: ".concat("https://docs.connect.squareup.com/payments/sqpaymentform/digitalwallet/applepay-setup#payment-request-object-example")))).name = "MissingTotalLabelError", t;
    }

    return a(e, d), e;
  }(),
      V = function (t) {
    function e(t) {
      var n;
      return o(this, e), (n = r(this, l(e).call(this, t))).name = "InvalidOriginError", n;
    }

    return a(e, d), e;
  }(),
      U = function (t) {
    function e(t) {
      var n;
      return o(this, e), (n = r(this, l(e).call(this, t))).name = "UnexpectedError", n;
    }

    return a(e, d), e;
  }();

  function B(t) {
    return {
      fileName: t.fileName,
      name: t.name,
      message: t.message,
      stack: t.stack
    };
  }

  function H(t) {
    var e = new (W[t.name] || d)();
    return t.message && (e.message = t.message), e.fileName = t.fileName, e.stack = t.stack, e;
  }

  var W = {
    SqError: d,
    ElementNotFoundError: h,
    ElementNotVisibleError: f,
    InvalidFieldError: y,
    HttpsRequiredError: m,
    FormAlreadyDestroyedError: v,
    FormNotReadyError: g,
    FormAlreadyBuiltError: E,
    IframeDoesNotExistError: _,
    TooManyIdsError: I,
    ValidateShippingContactDeprecatedError: b,
    InvalidArgumentError: S,
    MissingArgumentError: C,
    InvalidFunctionArgumentError: A,
    InvalidOptionError: P,
    InvalidOptionType: T,
    MissingOptionError: w,
    MissingElementIdError: O,
    MissingInputTypeError: N,
    UnexpectedInputTypeError: L,
    MissingCallbackError: R,
    InvalidCallbackError: M,
    MissingPaymentMethodError: k,
    InvalidInputStylesError: D,
    InvalidInputStylePropertyError: F,
    InvalidInputStyleValueError: x,
    InputHeightZeroError: q,
    UnsupportedBrowserError: G,
    MissingTotalLabelError: j,
    InvalidOriginError: V,
    UnexpectedError: U
  },
      Y = {
    serializeError: B,
    deserializeError: H
  };
  e.o = Object.assign({}, W, Y);
},, function (t, e) {
  var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  "number" == typeof __g && (__g = n);
}, function (t, e, n) {
  var i = n(51)("wks"),
      o = n(31),
      r = n(4).Symbol,
      a = "function" == typeof r;
  (t.exports = function (t) {
    return i[t] || (i[t] = a && r[t] || (a ? r : o)("Symbol." + t));
  }).store = i;
}, function (t, e) {
  t.exports = function (t) {
    return "object" == _typeof(t) ? null !== t : "function" == typeof t;
  };
}, function (t, e, n) {
  t.exports = !n(8)(function () {
    return 7 != Object.defineProperty({}, "a", {
      get: function get() {
        return 7;
      }
    }).a;
  });
}, function (t, e) {
  t.exports = function (t) {
    try {
      return !!t();
    } catch (t) {
      return !0;
    }
  };
}, function (t, e, n) {
  "use strict";

  n.d(e, "a", function () {
    return u;
  }), n.d(e, "b", function () {
    return p;
  }), n(18), n(19), n(11), n(23), n(13), n(15), n(68), n(46), n(115);
  var i = n(1),
      o = n(29);

  function r(t) {
    return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function a(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function s(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function c(t, e, n) {
    return e && s(t.prototype, e), n && s(t, n), t;
  }

  var l = i.a.url("https://pci-connect.squareup.com/v2/v"),
      u = Object.freeze({
    LOAD_EVENT: 0,
    NONCE_EVENT: 1,
    CONFIG_EVENT: 2,
    INSTALLMENTS_CONFIG_EVENT: 3,
    INSTALLMENTS_APPLICATION_RESULT_EVENT: 4,
    METHODS_SUPPORTED_EVENT: 5,
    INSTALLMENTS_SHOW_MODAL_EVENT: 6,
    GENERAL_EVENT: 7
  }),
      p = function () {
    function t(e) {
      a(this, t), this._options = Object.assign({}, e);
    }

    return c(t, [{
      key: "create",
      value: function value(t, e) {
        if (e || (e = {}), -1 === Object.values(u).indexOf(t)) throw new TypeError("Invalid event type: '".concat(t, "'"));
        if ("object" !== r(e)) throw new TypeError("Invalid fields: '".concat(e, "'"));
        var n = window.location.href,
            o = i.a.getParentLocation().href,
            a = Object.assign({}, e, {
          e: t,
          a: this._options.applicationId,
          o: this._options.locationId,
          n: this._options.sessionId,
          q: this._options.accountId,
          s: "SqPaymentForm",
          u: n,
          v: o,
          w: this._options.apiWrapper
        });
        return new d(a);
      }
    }, {
      key: "send",
      value: function value(t) {
        if (!(t instanceof d)) throw TypeError("Expected 'SqEvent'");
        o.a.post(l, {
          json: t.toObject()
        });
      }
    }, {
      key: "track",
      value: function value(t, e) {
        var n = this.create(t, e);
        this.send(n);
      }
    }, {
      key: "sessionId",
      set: function set(t) {
        this._options.sessionId || (this._options.sessionId = t);
      },
      get: function get() {
        return this._options.sessionId;
      }
    }]), t;
  }(),
      d = function () {
    function t(e) {
      var n = this;
      a(this, t), this._fields = {}, Object.keys(e).forEach(function (t) {
        n.set(t, e[t]);
      });
    }

    return c(t, [{
      key: "set",
      value: function value(t, e) {
        if (void 0 !== this._fields[t]) throw new Error("Field '".concat(t, "' already set."));
        this._fields[t] = e;
      }
    }, {
      key: "get",
      value: function value(t) {
        return this._fields[t];
      }
    }, {
      key: "toObject",
      value: function value() {
        return Object.assign({}, this._fields);
      }
    }, {
      key: "type",
      get: function get() {
        return this._fields.e;
      }
    }]), t;
  }();

  e.c = p;
}, function (t, e, n) {
  var i = n(12),
      o = n(71),
      r = n(41),
      a = Object.defineProperty;
  e.f = n(7) ? Object.defineProperty : function (t, e, n) {
    if (i(t), e = r(e, !0), i(n), o) try {
      return a(t, e, n);
    } catch (t) {}
    if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
    return "value" in n && (t[e] = n.value), t;
  };
}, function (t, e, n) {
  var i = n(10).f,
      o = Function.prototype,
      r = /^\s*function ([^ (]*)/;
  "name" in o || n(7) && i(o, "name", {
    configurable: !0,
    get: function get() {
      try {
        return ("" + this).match(r)[1];
      } catch (t) {
        return "";
      }
    }
  });
}, function (t, e, n) {
  var i = n(6);

  t.exports = function (t) {
    if (!i(t)) throw TypeError(t + " is not an object!");
    return t;
  };
}, function (t, e, n) {
  for (var i = n(15), o = n(25), r = n(16), a = n(4), s = n(21), c = n(35), l = n(5), u = l("iterator"), p = l("toStringTag"), d = c.Array, h = {
    CSSRuleList: !0,
    CSSStyleDeclaration: !1,
    CSSValueList: !1,
    ClientRectList: !1,
    DOMRectList: !1,
    DOMStringList: !1,
    DOMTokenList: !0,
    DataTransferItemList: !1,
    FileList: !1,
    HTMLAllCollection: !1,
    HTMLCollection: !1,
    HTMLFormElement: !1,
    HTMLSelectElement: !1,
    MediaList: !0,
    MimeTypeArray: !1,
    NamedNodeMap: !1,
    NodeList: !0,
    PaintRequestList: !1,
    Plugin: !1,
    PluginArray: !1,
    SVGLengthList: !1,
    SVGNumberList: !1,
    SVGPathSegList: !1,
    SVGPointList: !1,
    SVGStringList: !1,
    SVGTransformList: !1,
    SourceBufferList: !1,
    StyleSheetList: !0,
    TextTrackCueList: !1,
    TextTrackList: !1,
    TouchList: !1
  }, f = o(h), y = 0; y < f.length; y++) {
    var m,
        v = f[y],
        g = h[v],
        E = a[v],
        _ = E && E.prototype;

    if (_ && (_[u] || s(_, u, d), _[p] || s(_, p, v), c[v] = d, g)) for (m in i) {
      _[m] || r(_, m, i[m], !0);
    }
  }
}, function (t, e, n) {
  var i = n(4),
      o = n(27),
      r = n(21),
      a = n(16),
      s = n(30),
      c = "prototype",
      l = function l(t, e, n) {
    var u,
        p,
        d,
        h,
        f = t & l.F,
        y = t & l.G,
        m = t & l.S,
        v = t & l.P,
        g = t & l.B,
        E = y ? i : m ? i[e] || (i[e] = {}) : (i[e] || {})[c],
        _ = y ? o : o[e] || (o[e] = {}),
        b = _[c] || (_[c] = {});

    for (u in y && (n = e), n) {
      d = ((p = !f && E && void 0 !== E[u]) ? E : n)[u], h = g && p ? s(d, i) : v && "function" == typeof d ? s(Function.call, d) : d, E && a(E, u, d, t & l.U), _[u] != d && r(_, u, h), v && b[u] != d && (b[u] = d);
    }
  };

  i.core = o, l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, t.exports = l;
}, function (t, e, n) {
  "use strict";

  var i = n(85),
      o = n(76),
      r = n(35),
      a = n(26);
  t.exports = n(59)(Array, "Array", function (t, e) {
    this._t = a(t), this._i = 0, this._k = e;
  }, function () {
    var t = this._t,
        e = this._k,
        n = this._i++;
    return !t || n >= t.length ? (this._t = void 0, o(1)) : o(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
  }, "values"), r.Arguments = r.Array, i("keys"), i("values"), i("entries");
}, function (t, e, n) {
  var i = n(4),
      o = n(21),
      r = n(20),
      a = n(31)("src"),
      s = "toString",
      c = Function[s],
      l = ("" + c).split(s);
  n(27).inspectSource = function (t) {
    return c.call(t);
  }, (t.exports = function (t, e, n, s) {
    var c = "function" == typeof n;
    c && (r(n, "name") || o(n, "name", e)), t[e] !== n && (c && (r(n, a) || o(n, a, t[e] ? "" + t[e] : l.join(String(e)))), t === i ? t[e] = n : s ? t[e] ? t[e] = n : o(t, e, n) : (delete t[e], o(t, e, n)));
  })(Function.prototype, s, function () {
    return "function" == typeof this && this[a] || c.call(this);
  });
},, function (t, e, n) {
  n(69)("asyncIterator");
}, function (t, e, n) {
  "use strict";

  var i = n(4),
      o = n(20),
      r = n(7),
      a = n(14),
      s = n(16),
      c = n(43).KEY,
      l = n(8),
      u = n(51),
      p = n(38),
      d = n(31),
      h = n(5),
      f = n(70),
      y = n(69),
      m = n(93),
      v = n(83),
      g = n(12),
      E = n(6),
      _ = n(26),
      b = n(41),
      I = n(42),
      S = n(34),
      C = n(97),
      A = n(56),
      P = n(10),
      T = n(25),
      w = A.f,
      O = P.f,
      N = C.f,
      _L = i.Symbol,
      R = i.JSON,
      M = R && R.stringify,
      k = "prototype",
      D = h("_hidden"),
      F = h("toPrimitive"),
      x = {}.propertyIsEnumerable,
      q = u("symbol-registry"),
      G = u("symbols"),
      j = u("op-symbols"),
      V = Object[k],
      U = "function" == typeof _L,
      B = i.QObject,
      H = !B || !B[k] || !B[k].findChild,
      W = r && l(function () {
    return 7 != S(O({}, "a", {
      get: function get() {
        return O(this, "a", {
          value: 7
        }).a;
      }
    })).a;
  }) ? function (t, e, n) {
    var i = w(V, e);
    i && delete V[e], O(t, e, n), i && t !== V && O(V, e, i);
  } : O,
      Y = function Y(t) {
    var e = G[t] = S(_L[k]);
    return e._k = t, e;
  },
      K = U && "symbol" == _typeof(_L.iterator) ? function (t) {
    return "symbol" == _typeof(t);
  } : function (t) {
    return t instanceof _L;
  },
      z = function z(t, e, n) {
    return t === V && z(j, e, n), g(t), e = b(e, !0), g(n), o(G, e) ? (n.enumerable ? (o(t, D) && t[D][e] && (t[D][e] = !1), n = S(n, {
      enumerable: I(0, !1)
    })) : (o(t, D) || O(t, D, I(1, {})), t[D][e] = !0), W(t, e, n)) : O(t, e, n);
  },
      J = function J(t, e) {
    g(t);

    for (var n, i = m(e = _(e)), o = 0, r = i.length; o < r;) {
      z(t, n = i[o++], e[n]);
    }

    return t;
  },
      Q = function Q(t) {
    var e = x.call(this, t = b(t, !0));
    return !(this === V && o(G, t) && !o(j, t)) && (!(e || !o(this, t) || !o(G, t) || o(this, D) && this[D][t]) || e);
  },
      Z = function Z(t, e) {
    if (t = _(t), e = b(e, !0), t !== V || !o(G, e) || o(j, e)) {
      var n = w(t, e);
      return !n || !o(G, e) || o(t, D) && t[D][e] || (n.enumerable = !0), n;
    }
  },
      X = function X(t) {
    for (var e, n = N(_(t)), i = [], r = 0; n.length > r;) {
      o(G, e = n[r++]) || e == D || e == c || i.push(e);
    }

    return i;
  },
      $ = function $(t) {
    for (var e, n = t === V, i = N(n ? j : _(t)), r = [], a = 0; i.length > a;) {
      !o(G, e = i[a++]) || n && !o(V, e) || r.push(G[e]);
    }

    return r;
  };

  U || (s((_L = function L() {
    if (this instanceof _L) throw TypeError("Symbol is not a constructor!");

    var t = d(0 < arguments.length ? arguments[0] : void 0),
        e = function e(n) {
      this === V && e.call(j, n), o(this, D) && o(this[D], t) && (this[D][t] = !1), W(this, t, I(1, n));
    };

    return r && H && W(V, t, {
      configurable: !0,
      set: e
    }), Y(t);
  })[k], "toString", function () {
    return this._k;
  }), A.f = Z, P.f = z, n(44).f = C.f = X, n(33).f = Q, n(55).f = $, r && !n(36) && s(V, "propertyIsEnumerable", Q, !0), f.f = function (t) {
    return Y(h(t));
  }), a(a.G + a.W + a.F * !U, {
    Symbol: _L
  });

  for (var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; tt.length > et;) {
    h(tt[et++]);
  }

  for (var nt = T(h.store), it = 0; nt.length > it;) {
    y(nt[it++]);
  }

  a(a.S + a.F * !U, "Symbol", {
    for: function _for(t) {
      return o(q, t += "") ? q[t] : q[t] = _L(t);
    },
    keyFor: function keyFor(t) {
      if (!K(t)) throw TypeError(t + " is not a symbol!");

      for (var e in q) {
        if (q[e] === t) return e;
      }
    },
    useSetter: function useSetter() {
      H = !0;
    },
    useSimple: function useSimple() {
      H = !1;
    }
  }), a(a.S + a.F * !U, "Object", {
    create: function create(t, e) {
      return void 0 === e ? S(t) : J(S(t), e);
    },
    defineProperty: z,
    defineProperties: J,
    getOwnPropertyDescriptor: Z,
    getOwnPropertyNames: X,
    getOwnPropertySymbols: $
  }), R && a(a.S + a.F * (!U || l(function () {
    var t = _L();

    return "[null]" != M([t]) || "{}" != M({
      a: t
    }) || "{}" != M(Object(t));
  })), "JSON", {
    stringify: function stringify(t) {
      for (var e, n, i = [t], o = 1; arguments.length > o;) {
        i.push(arguments[o++]);
      }

      if (n = e = i[1], (E(e) || void 0 !== t) && !K(t)) return v(e) || (e = function e(t, _e) {
        if ("function" == typeof n && (_e = n.call(this, t, _e)), !K(_e)) return _e;
      }), i[1] = e, M.apply(R, i);
    }
  }), _L[k][F] || n(21)(_L[k], F, _L[k].valueOf), p(_L, "Symbol"), p(Math, "Math", !0), p(i.JSON, "JSON", !0);
}, function (t, e) {
  var n = {}.hasOwnProperty;

  t.exports = function (t, e) {
    return n.call(t, e);
  };
}, function (t, e, n) {
  var i = n(10),
      o = n(42);
  t.exports = n(7) ? function (t, e, n) {
    return i.f(t, e, o(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  "use strict";

  n(18), n(19), n(11), n(45);
  var i = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua And Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BQ: "Bonaire, Sint Eustatius, And Saba",
    BA: "Bosnia And Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria (rep.)",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    JE: "Channel Islands",
    GG: "Channel Islands",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CD: "Congo (dem. Rep.)",
    CG: "Congo (rep.)",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Cote D'ivoire",
    HR: "Croatia",
    CW: "Curacao",
    CY: "Cyprus",
    CZ: "Czech Rep.",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Rep.",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    AX: "Finland",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada (west Indies)",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinea-bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard And Mcdonald Islands",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary (rep.)",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle Of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao (people's Dem. Rep.)",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Macedonia",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia (federated State Of)",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru Central Pacific",
    NP: "Nepal",
    NL: "Netherlands",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory",
    PA: "Panama (rep.)",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    MD: "Rep. Moldova",
    SG: "Rep. Of Singapore",
    RS: "Republic Of Serbia",
    RE: "Reunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    BL: "Saint Barthelemy",
    SH: "Saint Helena",
    KN: "Saint Kitts And Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin",
    VC: "Saint Vincent And The Grenadines (antilles)",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome And Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SX: "Sint Maarten",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia",
    KR: "South Korea",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    PM: "St. Pierre And Miquelon",
    SR: "Suriname",
    SJ: "Svalbard And Jan Mayen Islands",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania (united Rep.)",
    TH: "Thailand",
    TL: "Timor-leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad And Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks And Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VA: "Vatican",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands (british)",
    VI: "Virgin Islands (u.s.)",
    WF: "Wallis And Futuna Islands",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe"
  };

  function o(t) {
    return (o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function r(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  var a = function () {
    function t(e) {
      !function (e, n) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this), e && "object" === o(e) || (e = {}), this.data = {}, this.familyName = e.familyName, this.givenName = e.givenName, this.email = e.email, this.country = e.country, this.region = e.region, this.city = e.city, this.addressLines = e.addressLines, this.postalCode = e.postalCode, this.phone = e.phone;
    }

    var e, n;
    return n = [{
      key: "fromApplePay",
      value: function value(e) {
        if (!e) return e;
        var n = e.countryCode;
        return n && (n = n.toUpperCase()), new t({
          addressLines: e.addressLines,
          city: e.locality,
          region: e.administrativeArea,
          postalCode: e.postalCode,
          country: n,
          givenName: e.givenName,
          familyName: e.familyName,
          email: e.emailAddress,
          phone: e.phoneNumber
        });
      }
    }, {
      key: "legacyFromApplePay",
      value: function value(e) {
        return e ? new t({
          addressLines: e.addressLines,
          city: e.locality,
          region: e.administrativeArea,
          postalCode: e.postalCode,
          country: e.countryCode,
          givenName: e.givenName,
          familyName: e.familyName,
          email: e.emailAddress,
          phone: e.phoneNumber
        }) : e;
      }
    }, {
      key: "fromGooglePay",
      value: function value(e) {
        return e ? new t({
          addressLines: [e.address1, e.address2, e.address3, e.address4, e.address5].filter(Boolean),
          city: e.locality,
          region: e.administrativeArea,
          postalCode: e.postalCode,
          country: e.countryCode,
          givenName: e.name,
          email: e.email,
          phone: e.phoneNumber
        }) : e;
      }
    }], r((e = t).prototype, [{
      key: "toApplePay",
      value: function value() {
        return {
          addressLines: this.data.addressLines,
          locality: this.data.city,
          administrativeArea: this.data.region,
          postalCode: this.data.postalCode,
          countryCode: this.data.country,
          country: this.data.countryName,
          givenName: this.data.givenName,
          familyName: this.data.familyName,
          emailAddress: this.data.email,
          phoneNumber: this.data.phone
        };
      }
    }, {
      key: "familyName",
      get: function get() {
        return this.data.familyName;
      },
      set: function set(t) {
        this.data.familyName = t;
      }
    }, {
      key: "givenName",
      get: function get() {
        return this.data.givenName;
      },
      set: function set(t) {
        this.data.givenName = t;
      }
    }, {
      key: "email",
      get: function get() {
        return this.data.email;
      },
      set: function set(t) {
        this.data.email = t;
      }
    }, {
      key: "phone",
      get: function get() {
        return this.data.phone;
      },
      set: function set(t) {
        this.data.phone = t;
      }
    }, {
      key: "country",
      get: function get() {
        return this.data.country;
      },
      set: function set(t) {
        this.data.country !== t && (this.data.country = t, this.data.countryName = i[t]);
      }
    }, {
      key: "countryName",
      get: function get() {
        return this.data.countryName;
      }
    }, {
      key: "region",
      get: function get() {
        return this.data.region;
      },
      set: function set(t) {
        this.data.region = t;
      }
    }, {
      key: "city",
      get: function get() {
        return this.data.city;
      },
      set: function set(t) {
        this.data.city = t;
      }
    }, {
      key: "addressLines",
      get: function get() {
        return this.data.addressLines;
      },
      set: function set(t) {
        !t || t instanceof Array || (t = [t.toString()]), this.data.addressLines = t;
      }
    }, {
      key: "postalCode",
      get: function get() {
        return this.data.postalCode;
      },
      set: function set(t) {
        this.data.postalCode = t;
      }
    }]), r(e, n), t;
  }();

  e.a = a;
}, function (t, e, n) {
  var i = n(49),
      o = n(25);
  n(77)("keys", function () {
    return function (t) {
      return o(i(t));
    };
  });
},, function (t, e, n) {
  var i = n(72),
      o = n(54);

  t.exports = Object.keys || function (t) {
    return i(t, o);
  };
}, function (t, e, n) {
  var i = n(61),
      o = n(32);

  t.exports = function (t) {
    return i(o(t));
  };
}, function (t, e) {
  var n = t.exports = {
    version: "2.5.7"
  };
  "number" == typeof __e && (__e = n);
}, function (t, e) {
  var n = {}.toString;

  t.exports = function (t) {
    return n.call(t).slice(8, -1);
  };
}, function (t, e, n) {
  "use strict";

  n(64), n(13), n(11), n(18), n(19), n(78);
  var i = n(1),
      o = n(2);

  function r(t) {
    return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function a(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function s(t, e) {
    return !e || "object" !== r(e) && "function" != typeof e ? function (e) {
      if (void 0 !== t) return t;
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }() : e;
  }

  function c(t) {
    return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }

  function l(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && function (t, e) {
      (Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }(t, e);
  }

  var u = {
    REQUEST_DURATION_MAX_MS: 6e4,
    REQUEST_TIMEOUT_MS: [1e4, 2e4, 3e4],
    RETRY_DELAY_MS: 200,
    BACKOFF_FACTOR: 1.66
  },
      p = function (t) {
    function e(t, n, i) {
      var o;
      return a(this, e), (o = s(this, c(e).call(this, "Request timeout exceeded (attempts=".concat(t, "; ").concat(n, "ms; ").concat(i, ")")))).name = "TimeoutError", o;
    }

    return l(e, o.l), e;
  }();

  u.TimeoutError = p;

  var d = function (t) {
    function e(t, n, i) {
      var o;
      return a(this, e), (o = s(this, c(e).call(this, "Network error during request (attempts=".concat(t, "; ").concat(n, "ms; ").concat(i, ")")))).name = "NetworkError", o;
    }

    return l(e, o.l), e;
  }();

  u.NetworkError = d;

  var h = function (t) {
    function e(t, n, i) {
      var o;
      return a(this, e), (o = s(this, c(e).call(this, "Invalid JSON received from ".concat(t, "; status=").concat(n, " response=").concat(i)))).name = "InvalidJsonError", o;
    }

    return l(e, o.l), e;
  }();

  u.InvalidJsonError = h, u.post = function (t, e, n) {
    n || "function" != typeof e || (n = e, e = {}), e || (e = {}), "function" != typeof n && (n = function n() {}), e._attempts ? e._attempts += 1 : e._attempts = 1, e._startTime || (e._startTime = Date.now()), e.timeout || (e.timeout = u.REQUEST_TIMEOUT_MS[0]);
    var o = new XMLHttpRequest();
    if (o.open("POST", t, !0), o.timeout = e.timeout, o.withCredentials = !0, e.headers) for (var r in e.headers) {
      i.a.hasOwn(e.headers, r) && o.setRequestHeader(r, e.headers[r]);
    }
    e.json && (e.body && (e.body = null), o.setRequestHeader("Accept", "application/json"), o.setRequestHeader("Content-Type", "application/json; charset=utf-8"));
    var a = e.body || JSON.stringify(e.json);
    o.onreadystatechange = function () {
      if (4 === o.readyState && 0 !== o.status) {
        var r = o.responseText;
        if (r && e.json) try {
          r = JSON.parse(r);
        } catch (s) {
          var a = i.a.truncate(r, 64);
          return n(new h(t, o.status, a));
        }
        var s = {
          headers: u.parseHeaders(o.getAllResponseHeaders()),
          status: o.status,
          statusText: o.statusText
        };
        n(null, s, r);
      }
    }, o.onerror = function () {
      o.abort();

      var i = e._attempts - 1,
          r = u.backoff(u.RETRY_DELAY_MS, i),
          a = Date.now() - e._startTime,
          s = u.REQUEST_DURATION_MAX_MS - a;

      if (s <= r) {
        if (s > e.timeout) {
          var c = s - e.timeout;
          return void setTimeout(function () {
            u.post(t, e, n);
          }, c);
        }

        n(new d(e._attempts, a, t));
      } else setTimeout(function () {
        u.post(t, e, n);
      }, r);
    }, o.ontimeout = function () {
      o.abort();

      var i = Date.now() - e._startTime,
          r = u.REQUEST_DURATION_MAX_MS - i;

      if (r <= 0) n(new p(e._attempts, i, t));else {
        var a = u.REQUEST_TIMEOUT_MS[Math.min(e._attempts, 2)];
        r < a && (a = r), e.timeout = a, setTimeout(function () {
          u.post(t, e, n);
        }, 0);
      }
    }, o.send(a);
  }, u.parseHeaders = function (t) {
    var e = {};
    return t && t.split("\r\n").forEach(function (t) {
      var n = t.indexOf(": ");

      if (0 < n) {
        var i = t.substring(0, n),
            o = t.substring(n + 2);
        e[i] = o;
      }
    }), e;
  }, u.backoff = function (t, e) {
    var n = u.BACKOFF_FACTOR;
    return Math.floor(t * Math.pow(n, e));
  }, e.a = u;
}, function (t, e, n) {
  var i = n(37);

  t.exports = function (t, e, n) {
    if (i(t), void 0 === e) return t;

    switch (n) {
      case 1:
        return function (n) {
          return t.call(e, n);
        };

      case 2:
        return function (n, i) {
          return t.call(e, n, i);
        };

      case 3:
        return function (n, i, o) {
          return t.call(e, n, i, o);
        };
    }

    return function () {
      return t.apply(e, arguments);
    };
  };
}, function (t, e) {
  var n = 0,
      i = Math.random();

  t.exports = function (t) {
    return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + i).toString(36));
  };
}, function (t, e) {
  t.exports = function (t) {
    if (null == t) throw TypeError("Can't call method on  " + t);
    return t;
  };
}, function (t, e) {
  e.f = {}.propertyIsEnumerable;
}, function (t, e, n) {
  var i = n(12),
      o = n(96),
      r = n(54),
      a = n(53)("IE_PROTO"),
      s = function s() {},
      c = "prototype",
      _l = function l() {
    var t,
        e = n(60)("iframe"),
        i = r.length;

    for (e.style.display = "none", n(84).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), _l = t.F; i--;) {
      delete _l[c][r[i]];
    }

    return _l();
  };

  t.exports = Object.create || function (t, e) {
    var n;
    return null !== t ? (s[c] = i(t), n = new s(), s[c] = null, n[a] = t) : n = _l(), void 0 === e ? n : o(n, e);
  };
}, function (t, e) {
  t.exports = {};
}, function (t, e) {
  t.exports = !1;
}, function (t, e) {
  t.exports = function (t) {
    if ("function" != typeof t) throw TypeError(t + " is not a function!");
    return t;
  };
}, function (t, e, n) {
  var i = n(10).f,
      o = n(20),
      r = n(5)("toStringTag");

  t.exports = function (t, e, n) {
    t && !o(t = n ? t : t.prototype, r) && i(t, r, {
      configurable: !0,
      value: e
    });
  };
}, function (t, e, n) {
  "use strict";

  e.a = {
    ie10: function ie10() {
      return document.documentElement && "function" == typeof document.documentElement.doScroll;
    },
    iosChrome: function iosChrome() {
      var t = window.navigator.userAgent;
      return /iphone|ipod|ipad/i.test(t) && /CriOS/i.test(t);
    },
    supported: function supported() {
      var t = window;
      return void 0 !== t.postMessage && void 0 !== t.XMLHttpRequest && void 0 !== document.createElement("a").classList;
    },
    language: function language() {
      return "undefined" == typeof navigator ? "en" : navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "en";
    }
  };
},, function (t, e, n) {
  var i = n(6);

  t.exports = function (t, e) {
    if (!i(t)) return t;
    var n, o;
    if (e && "function" == typeof (n = t.toString) && !i(o = n.call(t))) return o;
    if ("function" == typeof (n = t.valueOf) && !i(o = n.call(t))) return o;
    if (!e && "function" == typeof (n = t.toString) && !i(o = n.call(t))) return o;
    throw TypeError("Can't convert object to primitive value");
  };
}, function (t, e) {
  t.exports = function (t, e) {
    return {
      enumerable: !(1 & t),
      configurable: !(2 & t),
      writable: !(4 & t),
      value: e
    };
  };
}, function (t, e, n) {
  var i = n(31)("meta"),
      o = n(6),
      r = n(20),
      a = n(10).f,
      s = 0,
      c = Object.isExtensible || function () {
    return !0;
  },
      l = !n(8)(function () {
    return c(Object.preventExtensions({}));
  }),
      u = function u(t) {
    a(t, i, {
      value: {
        i: "O" + ++s,
        w: {}
      }
    });
  },
      p = t.exports = {
    KEY: i,
    NEED: !1,
    fastKey: function fastKey(t, e) {
      if (!o(t)) return "symbol" == _typeof(t) ? t : ("string" == typeof t ? "S" : "P") + t;

      if (!r(t, i)) {
        if (!c(t)) return "F";
        if (!e) return "E";
        u(t);
      }

      return t[i].i;
    },
    getWeak: function getWeak(t, e) {
      if (!r(t, i)) {
        if (!c(t)) return !0;
        if (!e) return !1;
        u(t);
      }

      return t[i].w;
    },
    onFreeze: function onFreeze(t) {
      return l && p.NEED && c(t) && !r(t, i) && u(t), t;
    }
  };
}, function (t, e, n) {
  var i = n(72),
      o = n(54).concat("length", "prototype");

  e.f = Object.getOwnPropertyNames || function (t) {
    return i(t, o);
  };
}, function (t, e, n) {
  "use strict";

  n(98);

  var i = n(12),
      o = n(57),
      r = n(7),
      a = "toString",
      s = /./[a],
      c = function c(t) {
    n(16)(RegExp.prototype, a, t, !0);
  };

  n(8)(function () {
    return "/a/b" != s.call({
      source: "a",
      flags: "b"
    });
  }) ? c(function () {
    var t = i(this);
    return "/".concat(t.source, "/", "flags" in t ? t.flags : !r && t instanceof RegExp ? o.call(t) : void 0);
  }) : s.name != a && c(function () {
    return s.call(this);
  });
}, function (t, e, n) {
  var i = n(14);
  i(i.S + i.F, "Object", {
    assign: n(99)
  });
}, function (t, e, n) {
  "use strict";

  var i = n(21),
      o = n(16),
      r = n(8),
      a = n(32),
      s = n(5);

  t.exports = function (t, e, n) {
    var c = s(t),
        l = n(a, c, ""[t]),
        u = l[0],
        p = l[1];
    r(function () {
      var e = {};
      return e[c] = function () {
        return 7;
      }, 7 != ""[t](e);
    }) && (o(String.prototype, t, u), i(RegExp.prototype, c, 2 == e ? function (t, e) {
      return p.call(t, this, e);
    } : function (t) {
      return p.call(t, this);
    }));
  };
},, function (t, e, n) {
  var i = n(32);

  t.exports = function (t) {
    return Object(i(t));
  };
}, function (t, e, n) {
  n(47)("replace", 2, function (t, e, n) {
    return [function (i, o) {
      "use strict";

      var r = t(this),
          a = null == i ? void 0 : i[e];
      return void 0 !== a ? a.call(i, r, o) : n.call(String(r), i, o);
    }, n];
  });
}, function (t, e, n) {
  var i = n(27),
      o = n(4),
      r = "__core-js_shared__",
      a = o[r] || (o[r] = {});
  (t.exports = function (t, e) {
    return a[t] || (a[t] = void 0 !== e ? e : {});
  })("versions", []).push({
    version: i.version,
    mode: n(36) ? "pure" : "global",
    copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
  });
}, function (t, e) {
  var n = Math.ceil,
      i = Math.floor;

  t.exports = function (t) {
    return isNaN(t = +t) ? 0 : (0 < t ? i : n)(t);
  };
}, function (t, e, n) {
  var i = n(51)("keys"),
      o = n(31);

  t.exports = function (t) {
    return i[t] || (i[t] = o(t));
  };
}, function (t, e) {
  t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function (t, e) {
  e.f = Object.getOwnPropertySymbols;
}, function (t, e, n) {
  var i = n(33),
      o = n(42),
      r = n(26),
      a = n(41),
      s = n(20),
      c = n(71),
      l = Object.getOwnPropertyDescriptor;
  e.f = n(7) ? l : function (t, e) {
    if (t = r(t), e = a(e, !0), c) try {
      return l(t, e);
    } catch (t) {}
    if (s(t, e)) return o(!i.f.call(t, e), t[e]);
  };
}, function (t, e, n) {
  "use strict";

  var i = n(12);

  t.exports = function () {
    var t = i(this),
        e = "";
    return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.unicode && (e += "u"), t.sticky && (e += "y"), e;
  };
}, function (t, e, n) {
  var i = n(6),
      o = n(74).set;

  t.exports = function (t, e, n) {
    var r,
        a = e.constructor;
    return a !== n && "function" == typeof a && (r = a.prototype) !== n.prototype && i(r) && o && o(t, r), t;
  };
}, function (t, e, n) {
  "use strict";

  var i = n(36),
      o = n(14),
      r = n(16),
      a = n(21),
      s = n(35),
      c = n(100),
      l = n(38),
      u = n(101),
      p = n(5)("iterator"),
      d = !([].keys && "next" in [].keys()),
      h = "values",
      f = function f() {
    return this;
  };

  t.exports = function (t, e, n, y, m, v, g) {
    c(n, e, y);

    var E,
        _,
        b,
        I = function I(t) {
      if (!d && t in P) return P[t];

      switch (t) {
        case "keys":
        case h:
          return function () {
            return new n(this, t);
          };
      }

      return function () {
        return new n(this, t);
      };
    },
        S = e + " Iterator",
        C = m == h,
        A = !1,
        P = t.prototype,
        T = P[p] || P["@@iterator"] || m && P[m],
        w = T || I(m),
        O = m ? C ? I("entries") : w : void 0,
        N = "Array" == e && P.entries || T;

    if (N && (b = u(N.call(new t()))) !== Object.prototype && b.next && (l(b, S, !0), i || "function" == typeof b[p] || a(b, p, f)), C && T && T.name !== h && (A = !0, w = function w() {
      return T.call(this);
    }), i && !g || !d && !A && P[p] || a(P, p, w), s[e] = w, s[S] = f, m) if (E = {
      values: C ? w : I(h),
      keys: v ? w : I("keys"),
      entries: O
    }, g) for (_ in E) {
      _ in P || r(P, _, E[_]);
    } else o(o.P + o.F * (d || A), e, E);
    return E;
  };
}, function (t, e, n) {
  var i = n(6),
      o = n(4).document,
      r = i(o) && i(o.createElement);

  t.exports = function (t) {
    return r ? o.createElement(t) : {};
  };
}, function (t, e, n) {
  var i = n(28);
  t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
    return "String" == i(t) ? t.split("") : Object(t);
  };
}, function (t, e, n) {
  var i = n(52),
      o = Math.min;

  t.exports = function (t) {
    return 0 < t ? o(i(t), 9007199254740991) : 0;
  };
}, function (t, e, n) {
  "use strict";

  var i = n(4),
      o = n(10),
      r = n(7),
      a = n(5)("species");

  t.exports = function (t) {
    var e = i[t];
    r && e && !e[a] && o.f(e, a, {
      configurable: !0,
      get: function get() {
        return this;
      }
    });
  };
}, function (t, e, n) {
  n(47)("split", 2, function (t, e, i) {
    "use strict";

    var o = n(75),
        r = i,
        a = [].push,
        s = "split",
        c = "length",
        l = "lastIndex";

    if ("c" == "abbc"[s](/(b)*/)[1] || 4 != "test"[s](/(?:)/, -1)[c] || 2 != "ab"[s](/(?:ab)*/)[c] || 4 != "."[s](/(.?)(.?)/)[c] || 1 < "."[s](/()()/)[c] || ""[s](/.?/)[c]) {
      var u = void 0 === /()??/.exec("")[1];

      i = function i(t, e) {
        var n = String(this);
        if (void 0 === t && 0 === e) return [];
        if (!o(t)) return r.call(n, t, e);
        var i,
            s,
            p,
            d,
            h,
            f = [],
            y = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""),
            m = 0,
            v = void 0 === e ? 4294967295 : e >>> 0,
            g = new RegExp(t.source, y + "g");

        for (u || (i = new RegExp("^" + g.source + "$(?!\\s)", y)); (s = g.exec(n)) && !(m < (p = s.index + s[0][c]) && (f.push(n.slice(m, s.index)), !u && 1 < s[c] && s[0].replace(i, function () {
          for (h = 1; h < arguments[c] - 2; h++) {
            void 0 === arguments[h] && (s[h] = void 0);
          }
        }), 1 < s[c] && s.index < n[c] && a.apply(f, s.slice(1)), d = s[0][c], m = p, f[c] >= v));) {
          g[l] === s.index && g[l]++;
        }

        return m === n[c] ? !d && g.test("") || f.push("") : f.push(n.slice(m)), f[c] > v ? f.slice(0, v) : f;
      };
    } else "0"[s](void 0, 0)[c] && (i = function i(t, e) {
      return void 0 === t && 0 === e ? [] : r.call(this, t, e);
    });

    return [function (n, o) {
      var r = t(this),
          a = null == n ? void 0 : n[e];
      return void 0 !== a ? a.call(n, r, o) : i.call(String(r), n, o);
    }, i];
  });
}, function (t, e, n) {
  var i = n(16);

  t.exports = function (t, e, n) {
    for (var o in e) {
      i(t, o, e[o], n);
    }

    return t;
  };
}, function (t, e) {
  t.exports = function (t, e, n, i) {
    if (!(t instanceof e) || void 0 !== i && i in t) throw TypeError(n + ": incorrect invocation!");
    return t;
  };
}, function (t, e, n) {
  var i = n(30),
      o = n(107),
      r = n(108),
      a = n(12),
      s = n(62),
      c = n(109),
      l = {},
      u = {};
  (e = t.exports = function (t, e, n, p, d) {
    var h,
        f,
        y,
        m,
        v = d ? function () {
      return t;
    } : c(t),
        g = i(n, p, e ? 2 : 1),
        E = 0;
    if ("function" != typeof v) throw TypeError(t + " is not iterable!");

    if (r(v)) {
      for (h = s(t.length); E < h; E++) {
        if ((m = e ? g(a(f = t[E])[0], f[1]) : g(t[E])) === l || m === u) return m;
      }
    } else for (y = v.call(t); !(f = y.next()).done;) {
      if ((m = o(y, g, f.value, e)) === l || m === u) return m;
    }
  }).BREAK = l, e.RETURN = u;
}, function (t, e, n) {
  var i = n(14),
      o = n(114)(!1);
  i(i.S, "Object", {
    values: function values(t) {
      return o(t);
    }
  });
}, function (t, e, n) {
  var i = n(4),
      o = n(27),
      r = n(36),
      a = n(70),
      s = n(10).f;

  t.exports = function (t) {
    var e = o.Symbol || (o.Symbol = r ? {} : i.Symbol || {});
    "_" == t.charAt(0) || t in e || s(e, t, {
      value: a.f(t)
    });
  };
}, function (t, e, n) {
  e.f = n(5);
}, function (t, e, n) {
  t.exports = !n(7) && !n(8)(function () {
    return 7 != Object.defineProperty(n(60)("div"), "a", {
      get: function get() {
        return 7;
      }
    }).a;
  });
}, function (t, e, n) {
  var i = n(20),
      o = n(26),
      r = n(94)(!1),
      a = n(53)("IE_PROTO");

  t.exports = function (t, e) {
    var n,
        s = o(t),
        c = 0,
        l = [];

    for (n in s) {
      n != a && i(s, n) && l.push(n);
    }

    for (; e.length > c;) {
      i(s, n = e[c++]) && (~r(l, n) || l.push(n));
    }

    return l;
  };
}, function (t, e, n) {
  var i = n(4),
      o = n(58),
      r = n(10).f,
      a = n(44).f,
      s = n(75),
      c = n(57),
      _l2 = i.RegExp,
      u = _l2,
      p = _l2.prototype,
      d = /a/g,
      h = /a/g,
      f = new _l2(d) !== d;

  if (n(7) && (!f || n(8)(function () {
    return h[n(5)("match")] = !1, _l2(d) != d || _l2(h) == h || "/a/i" != _l2(d, "i");
  }))) {
    _l2 = function l(t, e) {
      var n = this instanceof _l2,
          i = s(t),
          r = void 0 === e;
      return !n && i && t.constructor === _l2 && r ? t : o(f ? new u(i && !r ? t.source : t, e) : u((i = t instanceof _l2) ? t.source : t, i && r ? c.call(t) : e), n ? this : p, _l2);
    };

    for (var y = function y(t) {
      (t in _l2) || r(_l2, t, {
        configurable: !0,
        get: function get() {
          return u[t];
        },
        set: function set(e) {
          u[t] = e;
        }
      });
    }, m = a(u), v = 0; m.length > v;) {
      y(m[v++]);
    }

    (p.constructor = _l2).prototype = p, n(16)(i, "RegExp", _l2);
  }

  n(63)("RegExp");
}, function (t, e, n) {
  var i = n(6),
      o = n(12),
      r = function r(t, e) {
    if (o(t), !i(e) && null !== e) throw TypeError(e + ": can't set as prototype!");
  };

  t.exports = {
    set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, e, i) {
      try {
        (i = n(30)(Function.call, n(56).f(Object.prototype, "__proto__").set, 2))(t, []), e = !(t instanceof Array);
      } catch (t) {
        e = !0;
      }

      return function (t, n) {
        return r(t, n), e ? t.__proto__ = n : i(t, n), t;
      };
    }({}, !1) : void 0),
    check: r
  };
}, function (t, e, n) {
  var i = n(6),
      o = n(28),
      r = n(5)("match");

  t.exports = function (t) {
    var e;
    return i(t) && (void 0 !== (e = t[r]) ? !!e : "RegExp" == o(t));
  };
}, function (t, e) {
  t.exports = function (t, e) {
    return {
      value: e,
      done: !!t
    };
  };
}, function (t, e, n) {
  var i = n(14),
      o = n(27),
      r = n(8);

  t.exports = function (t, e) {
    var n = (o.Object || {})[t] || Object[t],
        a = {};
    a[t] = e(n), i(i.S + i.F * r(function () {
      n(1);
    }), "Object", a);
  };
}, function (t, e, n) {
  var i = n(14);
  i(i.S, "Object", {
    setPrototypeOf: n(74).set
  });
}, function (t, e, n) {
  var i = n(6);

  t.exports = function (t, e) {
    if (!i(t) || t._t !== e) throw TypeError("Incompatible receiver, " + e + " required!");
    return t;
  };
}, function (t, e, n) {
  "use strict";

  n(11);
  var i = ["constructor", "hasOwnProperty", "isPrototypeOf", "toLocaleString", "toString", "valueOf", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "__proto__"];

  function o() {
    this.handlers = {};
  }

  o.prototype.add = function (t, e) {
    if ("string" != typeof t || -1 < i.indexOf(t)) throw Error("Invalid event: " + t);
    this.handlers[t] ? this.handlers[t].push(e) : this.handlers[t] = [e];
  }, o.prototype.handle = function (t, e) {
    var n = this.handlers[t],
        i = 0;
    if (n) for (var o = 0; o < n.length; o++) {
      n[o](e), i += 1;
    }
    return i;
  }, e.a = o;
}, function (t, e, n) {
  "use strict";

  function i(t, e) {
    return !!t.querySelector(e);
  }

  function o(t, e) {
    return void 0 !== t[e];
  }

  n(73), n(113), n(15), n(23), n(11), n(13);
  var r,
      a = n(9);

  function s(t) {
    if (!(t instanceof a.b)) throw new TypeError("Expected 'SqEventstream'");
    this.eventstream = t;
    var e = window.performance;
    e && "function" == typeof e.getEntriesByType ? this.performance = e : this.performance = void 0;
  }

  function c(t) {
    switch (t.initiatorType) {
      case "script":
        return /v2\/paymentform/.test(t.name);

      case "iframe":
        return /v2\/iframe/.test(t.name);

      default:
        return !1;
    }
  }

  s.prototype.collectLoadTiming = function (t) {
    var e = this._resources().filter(c),
        n = {
      t: t.tti
    };

    e.forEach(function (t) {
      var e = function (t) {
        switch (r || (r = document.createElement("a")), r.href = t, r.pathname) {
          case "/v2/paymentform":
            return "m";

          case "/v2/iframe":
            switch (!0) {
              case /type=main/.test(r.search):
                return "f";

              case /type=cardNumber/.test(r.search):
                return "n";

              case /type=giftCard/.test(r.search):
                return "g";

              case /type=cvv/.test(r.search):
                return "v";

              case /type=expirationDate/.test(r.search):
                return "x";

              case /type=postalCode/.test(r.search):
                return "p";

              default:
                return "?";
            }

        }
      }(t.name),
          i = Math.round(t.duration);

      n[e] = i;
    }), this.eventstream.track(a.a.LOAD_EVENT, {
      l: n
    });
  }, s.prototype.collectNonceTiming = function (t, e) {
    var n = "https://pci-connect.squareup.com/v2/card-nonce\\?_=" + t,
        i = this._resources().filter(function (t, e) {
      switch (e.initiatorType) {
        case "xmlhttprequest":
          return new RegExp(t).test(e.name);

        default:
          return !1;
      }
    }.bind(null, n)).pop();

    i || (i = {
      duration: Date.now() - e.startTime
    });
    var o = {
      d: Math.round(i.duration),
      e: "".concat(e.error || !1)
    };
    "boolean" == typeof e.validLuhn && (o.l = "".concat(e.validLuhn)), this.eventstream.track(a.a.NONCE_EVENT, {
      l: o
    });
  }, s.prototype.collectConfiguration = function (t) {
    delete t.sessionId, delete t.errorLogger, delete t.expectedInputTypes;
    var e = Object.keys(t).filter(function (e) {
      return !1 !== t[e];
    }),
        n = Object.keys(t).filter(function (e) {
      return !1 === t[e];
    }),
        r = Object.keys(t.callbacks).filter(function (e) {
      return "function" == typeof t.callbacks[e];
    });
    t.inputStyles && t.inputStyles.some(function (t) {
      if (t.mediaMinWidth || t.mediaMaxWidth) return e.push("mediaBreakpoints");
    });

    var s = function (t) {
      for (var e = o(t, "angular"), n = o(t, "getAllAngularRootElements"), r = e || n, a = o(t, "bootstrap"), s = o(t, "Ember"), c = o(t, "jQuery"), l = i(t.document, 'form[action*="paypal.com"]'), u = i(t.document, "[data-reactroot]"), p = o(t, "__NUXT__") || o(t, "$nuxt"), d = {
        angular: r,
        bootstrap: a,
        ember: s,
        jquery: c,
        paypalBuyNow: l,
        react: u,
        vue: o(t, "Vue") || p
      }, h = Object.keys(d), f = 0; f < h.length; f++) {
        var y = h[f];
        !0 !== d[y] && delete d[y];
      }

      return d;
    }(window),
        c = Object.keys(s),
        l = {
      c: {
        e: e.join(" "),
        d: n.join(" "),
        c: r.join(" "),
        l: c.join(" ")
      }
    };

    this.eventstream.track(a.a.CONFIG_EVENT, l);
  }, s.prototype._resources = function () {
    return this.performance ? this.performance.getEntriesByType("resource") : [];
  }, e.a = s;
},, function (t, e, n) {
  var i = n(28);

  t.exports = Array.isArray || function (t) {
    return "Array" == i(t);
  };
}, function (t, e, n) {
  var i = n(4).document;
  t.exports = i && i.documentElement;
}, function (t, e, n) {
  var i = n(5)("unscopables"),
      o = Array.prototype;
  null == o[i] && n(21)(o, i, {}), t.exports = function (t) {
    o[i][t] = !0;
  };
}, function (t, e, n) {
  var i = n(28),
      o = n(5)("toStringTag"),
      r = "Arguments" == i(function () {
    return arguments;
  }());

  t.exports = function (t) {
    var e, n, a;
    return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {
      try {
        return t[e];
      } catch (t) {}
    }(e = Object(t), o)) ? n : r ? i(e) : "Object" == (a = i(e)) && "function" == typeof e.callee ? "Arguments" : a;
  };
}, function (t, e, n) {
  var i = n(5)("iterator"),
      o = !1;

  try {
    var r = [7][i]();
    r.return = function () {
      o = !0;
    }, Array.from(r, function () {
      throw 2;
    });
  } catch (t) {}

  t.exports = function (t, e) {
    if (!e && !o) return !1;
    var n = !1;

    try {
      var r = [7],
          a = r[i]();
      a.next = function () {
        return {
          done: n = !0
        };
      }, r[i] = function () {
        return a;
      }, t(r);
    } catch (t) {}

    return n;
  };
}, function (t, e) {
  t.exports = function (t, e, n) {
    var i = void 0 === n;

    switch (e.length) {
      case 0:
        return i ? t() : t.call(n);

      case 1:
        return i ? t(e[0]) : t.call(n, e[0]);

      case 2:
        return i ? t(e[0], e[1]) : t.call(n, e[0], e[1]);

      case 3:
        return i ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);

      case 4:
        return i ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3]);
    }

    return t.apply(n, e);
  };
}, function (t, e, n) {
  "use strict";

  var i = n(4),
      o = n(20),
      r = n(28),
      a = n(58),
      s = n(41),
      c = n(8),
      l = n(44).f,
      u = n(56).f,
      p = n(10).f,
      d = n(90).trim,
      h = "Number",
      _f = i[h],
      y = _f,
      m = _f.prototype,
      v = r(n(34)(m)) == h,
      g = "trim" in String.prototype,
      E = function E(t) {
    var e = s(t, !1);

    if ("string" == typeof e && 2 < e.length) {
      var n,
          i,
          o,
          r = (e = g ? e.trim() : d(e, 3)).charCodeAt(0);

      if (43 === r || 45 === r) {
        if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN;
      } else if (48 === r) {
        switch (e.charCodeAt(1)) {
          case 66:
          case 98:
            i = 2, o = 49;
            break;

          case 79:
          case 111:
            i = 8, o = 55;
            break;

          default:
            return +e;
        }

        for (var a, c = e.slice(2), l = 0, u = c.length; l < u; l++) {
          if ((a = c.charCodeAt(l)) < 48 || o < a) return NaN;
        }

        return parseInt(c, i);
      }
    }

    return +e;
  };

  if (!_f(" 0o1") || !_f("0b1") || _f("+0x1")) {
    _f = function f(t) {
      var e = arguments.length < 1 ? 0 : t,
          n = this;
      return n instanceof _f && (v ? c(function () {
        m.valueOf.call(n);
      }) : r(n) != h) ? a(new y(E(e)), n, _f) : E(e);
    };

    for (var _, b = n(7) ? l(y) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), I = 0; b.length > I; I++) {
      o(y, _ = b[I]) && !o(_f, _) && p(_f, _, u(y, _));
    }

    (_f.prototype = m).constructor = _f, n(16)(i, h, _f);
  }
}, function (t, e, n) {
  var i = n(14),
      o = n(32),
      r = n(8),
      a = n(91),
      s = "[" + a + "]",
      c = RegExp("^" + s + s + "*"),
      l = RegExp(s + s + "*$"),
      u = function u(t, e, n) {
    var o = {},
        s = r(function () {
      return !!a[t]() || "​" != "​"[t]();
    }),
        c = o[t] = s ? e(p) : a[t];
    n && (o[n] = c), i(i.P + i.F * s, "String", o);
  },
      p = u.trim = function (t, e) {
    return t = String(o(t)), 1 & e && (t = t.replace(c, "")), 2 & e && (t = t.replace(l, "")), t;
  };

  t.exports = u;
}, function (t, e) {
  t.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
},, function (t, e, n) {
  var i = n(25),
      o = n(55),
      r = n(33);

  t.exports = function (t) {
    var e = i(t),
        n = o.f;
    if (n) for (var a, s = n(t), c = r.f, l = 0; s.length > l;) {
      c.call(t, a = s[l++]) && e.push(a);
    }
    return e;
  };
}, function (t, e, n) {
  var i = n(26),
      o = n(62),
      r = n(95);

  t.exports = function (t) {
    return function (e, n, a) {
      var s,
          c = i(e),
          l = o(c.length),
          u = r(a, l);

      if (t && n != n) {
        for (; u < l;) {
          if ((s = c[u++]) != s) return !0;
        }
      } else for (; u < l; u++) {
        if ((t || u in c) && c[u] === n) return t || u || 0;
      }

      return !t && -1;
    };
  };
}, function (t, e, n) {
  var i = n(52),
      o = Math.max,
      r = Math.min;

  t.exports = function (t, e) {
    return (t = i(t)) < 0 ? o(t + e, 0) : r(t, e);
  };
}, function (t, e, n) {
  var i = n(10),
      o = n(12),
      r = n(25);
  t.exports = n(7) ? Object.defineProperties : function (t, e) {
    o(t);

    for (var n, a = r(e), s = a.length, c = 0; c < s;) {
      i.f(t, n = a[c++], e[n]);
    }

    return t;
  };
}, function (t, e, n) {
  var i = n(26),
      o = n(44).f,
      r = {}.toString,
      a = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  t.exports.f = function (t) {
    return a && "[object Window]" == r.call(t) ? function (t) {
      try {
        return o(t);
      } catch (t) {
        return a.slice();
      }
    }(t) : o(i(t));
  };
}, function (t, e, n) {
  n(7) && "g" != /./g.flags && n(10).f(RegExp.prototype, "flags", {
    configurable: !0,
    get: n(57)
  });
}, function (t, e, n) {
  "use strict";

  var i = n(25),
      o = n(55),
      r = n(33),
      a = n(49),
      s = n(61),
      c = Object.assign;
  t.exports = !c || n(8)(function () {
    var t = {},
        e = {},
        n = Symbol(),
        i = "abcdefghijklmnopqrst";
    return t[n] = 7, i.split("").forEach(function (t) {
      e[t] = t;
    }), 7 != c({}, t)[n] || Object.keys(c({}, e)).join("") != i;
  }) ? function (t, e) {
    for (var n = a(t), c = arguments.length, l = 1, u = o.f, p = r.f; l < c;) {
      for (var d, h = s(arguments[l++]), f = u ? i(h).concat(u(h)) : i(h), y = f.length, m = 0; m < y;) {
        p.call(h, d = f[m++]) && (n[d] = h[d]);
      }
    }

    return n;
  } : c;
}, function (t, e, n) {
  "use strict";

  var i = n(34),
      o = n(42),
      r = n(38),
      a = {};
  n(21)(a, n(5)("iterator"), function () {
    return this;
  }), t.exports = function (t, e, n) {
    t.prototype = i(a, {
      next: o(1, n)
    }), r(t, e + " Iterator");
  };
}, function (t, e, n) {
  var i = n(20),
      o = n(49),
      r = n(53)("IE_PROTO"),
      a = Object.prototype;

  t.exports = Object.getPrototypeOf || function (t) {
    return t = o(t), i(t, r) ? t[r] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null;
  };
}, function (t, e, n) {
  n(47)("match", 1, function (t, e, n) {
    return [function (n) {
      "use strict";

      var i = t(this),
          o = null == n ? void 0 : n[e];
      return void 0 !== o ? o.call(n, i) : new RegExp(n)[e](String(i));
    }, n];
  });
}, function (t, e, n) {
  "use strict";

  var i = n(104)(!0);
  n(59)(String, "String", function (t) {
    this._t = String(t), this._i = 0;
  }, function () {
    var t,
        e = this._t,
        n = this._i;
    return n >= e.length ? {
      value: void 0,
      done: !0
    } : (t = i(e, n), this._i += t.length, {
      value: t,
      done: !1
    });
  });
}, function (t, e, n) {
  var i = n(52),
      o = n(32);

  t.exports = function (t) {
    return function (e, n) {
      var r,
          a,
          s = String(o(e)),
          c = i(n),
          l = s.length;
      return c < 0 || l <= c ? t ? "" : void 0 : (r = s.charCodeAt(c)) < 55296 || 56319 < r || c + 1 === l || (a = s.charCodeAt(c + 1)) < 56320 || 57343 < a ? t ? s.charAt(c) : r : t ? s.slice(c, c + 2) : a - 56320 + (r - 55296 << 10) + 65536;
    };
  };
}, function (t, e, n) {
  "use strict";

  var i = n(106),
      o = n(79);
  t.exports = n(110)("Map", function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, {
    get: function get(t) {
      var e = i.getEntry(o(this, "Map"), t);
      return e && e.v;
    },
    set: function set(t, e) {
      return i.def(o(this, "Map"), 0 === t ? 0 : t, e);
    }
  }, i, !0);
}, function (t, e, n) {
  "use strict";

  var i = n(10).f,
      o = n(34),
      r = n(65),
      a = n(30),
      s = n(66),
      c = n(67),
      l = n(59),
      u = n(76),
      p = n(63),
      d = n(7),
      h = n(43).fastKey,
      f = n(79),
      y = d ? "_s" : "size",
      m = function m(t, e) {
    var n,
        i = h(e);
    if ("F" !== i) return t._i[i];

    for (n = t._f; n; n = n.n) {
      if (n.k == e) return n;
    }
  };

  t.exports = {
    getConstructor: function getConstructor(t, e, n, l) {
      var u = t(function (t, i) {
        s(t, u, e, "_i"), t._t = e, t._i = o(null), t._f = void 0, t._l = void 0, t[y] = 0, null != i && c(i, n, t[l], t);
      });
      return r(u.prototype, {
        clear: function clear() {
          for (var t = f(this, e), n = t._i, i = t._f; i; i = i.n) {
            i.r = !0, i.p && (i.p = i.p.n = void 0), delete n[i.i];
          }

          t._f = t._l = void 0, t[y] = 0;
        },
        delete: function _delete(t) {
          var n = f(this, e),
              i = m(n, t);

          if (i) {
            var o = i.n,
                r = i.p;
            delete n._i[i.i], i.r = !0, r && (r.n = o), o && (o.p = r), n._f == i && (n._f = o), n._l == i && (n._l = r), n[y]--;
          }

          return !!i;
        },
        forEach: function forEach(t) {
          f(this, e);

          for (var n, i = a(t, 1 < arguments.length ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) {
            for (i(n.v, n.k, this); n && n.r;) {
              n = n.p;
            }
          }
        },
        has: function has(t) {
          return !!m(f(this, e), t);
        }
      }), d && i(u.prototype, "size", {
        get: function get() {
          return f(this, e)[y];
        }
      }), u;
    },
    def: function def(t, e, n) {
      var i,
          o,
          r = m(t, e);
      return r ? r.v = n : (t._l = r = {
        i: o = h(e, !0),
        k: e,
        v: n,
        p: i = t._l,
        n: void 0,
        r: !1
      }, t._f || (t._f = r), i && (i.n = r), t[y]++, "F" !== o && (t._i[o] = r)), t;
    },
    getEntry: m,
    setStrong: function setStrong(t, e, n) {
      l(t, e, function (t, n) {
        this._t = f(t, e), this._k = n, this._l = void 0;
      }, function () {
        for (var t = this, e = t._k, n = t._l; n && n.r;) {
          n = n.p;
        }

        return t._t && (t._l = n = n ? n.n : t._t._f) ? u(0, "keys" == e ? n.k : "values" == e ? n.v : [n.k, n.v]) : (t._t = void 0, u(1));
      }, n ? "entries" : "values", !n, !0), p(e);
    }
  };
}, function (t, e, n) {
  var i = n(12);

  t.exports = function (t, e, n, o) {
    try {
      return o ? e(i(n)[0], n[1]) : e(n);
    } catch (e) {
      var r = t.return;
      throw void 0 !== r && i(r.call(t)), e;
    }
  };
}, function (t, e, n) {
  var i = n(35),
      o = n(5)("iterator"),
      r = Array.prototype;

  t.exports = function (t) {
    return void 0 !== t && (i.Array === t || r[o] === t);
  };
}, function (t, e, n) {
  var i = n(86),
      o = n(5)("iterator"),
      r = n(35);

  t.exports = n(27).getIteratorMethod = function (t) {
    if (null != t) return t[o] || t["@@iterator"] || r[i(t)];
  };
}, function (t, e, n) {
  "use strict";

  var i = n(4),
      o = n(14),
      r = n(16),
      a = n(65),
      s = n(43),
      c = n(67),
      l = n(66),
      u = n(6),
      p = n(8),
      d = n(87),
      h = n(38),
      f = n(58);

  t.exports = function (t, e, n, y, m, v) {
    var g = i[t],
        E = g,
        _ = m ? "set" : "add",
        b = E && E.prototype,
        I = {},
        S = function S(t) {
      var e = b[t];
      r(b, t, "delete" == t ? function (t) {
        return !(v && !u(t)) && e.call(this, 0 === t ? 0 : t);
      } : "has" == t ? function (t) {
        return !(v && !u(t)) && e.call(this, 0 === t ? 0 : t);
      } : "get" == t ? function (t) {
        return v && !u(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
      } : "add" == t ? function (t) {
        return e.call(this, 0 === t ? 0 : t), this;
      } : function (t, n) {
        return e.call(this, 0 === t ? 0 : t, n), this;
      });
    };

    if ("function" == typeof E && (v || b.forEach && !p(function () {
      new E().entries().next();
    }))) {
      var C = new E(),
          A = C[_](v ? {} : -0, 1) != C,
          P = p(function () {
        C.has(1);
      }),
          T = d(function (t) {
        new E(t);
      }),
          w = !v && p(function () {
        for (var t = new E(), e = 5; e--;) {
          t[_](e, e);
        }

        return !t.has(-0);
      });
      T || (((E = e(function (e, n) {
        l(e, E, t);
        var i = f(new g(), e, E);
        return null != n && c(n, m, i[_], i), i;
      })).prototype = b).constructor = E), (P || w) && (S("delete"), S("has"), m && S("get")), (w || A) && S(_), v && b.clear && delete b.clear;
    } else E = y.getConstructor(e, t, m, _), a(E.prototype, n), s.NEED = !0;

    return h(E, t), I[t] = E, o(o.G + o.W + o.F * (E != g), I), v || y.setStrong(E, t, m), E;
  };
}, function (t, e, n) {
  var i = n(14),
      o = n(34),
      r = n(37),
      a = n(12),
      s = n(6),
      c = n(8),
      l = n(112),
      u = (n(4).Reflect || {}).construct,
      p = c(function () {
    function t() {}

    return !(u(function () {}, [], t) instanceof t);
  }),
      d = !c(function () {
    u(function () {});
  });
  i(i.S + i.F * (p || d), "Reflect", {
    construct: function construct(t, e) {
      r(t), a(e);
      var n = arguments.length < 3 ? t : r(arguments[2]);
      if (d && !p) return u(t, e, n);

      if (t == n) {
        switch (e.length) {
          case 0:
            return new t();

          case 1:
            return new t(e[0]);

          case 2:
            return new t(e[0], e[1]);

          case 3:
            return new t(e[0], e[1], e[2]);

          case 4:
            return new t(e[0], e[1], e[2], e[3]);
        }

        var i = [null];
        return i.push.apply(i, e), new (l.apply(t, i))();
      }

      var c = n.prototype,
          h = o(s(c) ? c : Object.prototype),
          f = Function.apply.call(t, h, e);
      return s(f) ? f : h;
    }
  });
}, function (t, e, n) {
  "use strict";

  var i = n(37),
      o = n(6),
      r = n(88),
      a = [].slice,
      s = {};

  t.exports = Function.bind || function (t) {
    var e = i(this),
        n = a.call(arguments, 1),
        c = function c() {
      var i = n.concat(a.call(arguments));
      return this instanceof c ? function (t, e, n) {
        if (!(e in s)) {
          for (var i = [], o = 0; o < e; o++) {
            i[o] = "a[" + o + "]";
          }

          s[e] = Function("F,a", "return new F(" + i.join(",") + ")");
        }

        return s[e](t, n);
      }(e, i.length, i) : r(e, i, t);
    };

    return o(e.prototype) && (c.prototype = e.prototype), c;
  };
}, function (t, e, n) {
  n(47)("search", 1, function (t, e, n) {
    return [function (n) {
      "use strict";

      var i = t(this),
          o = null == n ? void 0 : n[e];
      return void 0 !== o ? o.call(n, i) : new RegExp(n)[e](String(i));
    }, n];
  });
}, function (t, e, n) {
  var i = n(25),
      o = n(26),
      r = n(33).f;

  t.exports = function (t) {
    return function (e) {
      for (var n, a = o(e), s = i(a), c = s.length, l = 0, u = []; l < c;) {
        r.call(a, n = s[l++]) && u.push(t ? [n, a[n]] : a[n]);
      }

      return u;
    };
  };
}, function (t, e, n) {
  var i = n(6),
      o = n(43).onFreeze;
  n(77)("freeze", function (t) {
    return function (e) {
      return t && i(e) ? t(o(e)) : e;
    };
  });
},, function (t, e, n) {
  "use strict";

  var i = n(14),
      o = n(124)(5),
      r = "find",
      a = !0;
  r in [] && Array(1)[r](function () {
    a = !1;
  }), i(i.P + i.F * a, "Array", {
    find: function find(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0);
    }
  }), n(85)(r);
}, function (t, e, n) {
  var i,
      o,
      r,
      a = n(30),
      s = n(88),
      c = n(84),
      l = n(60),
      u = n(4),
      p = u.process,
      d = u.setImmediate,
      h = u.clearImmediate,
      f = u.MessageChannel,
      y = u.Dispatch,
      m = 0,
      v = {},
      g = "onreadystatechange",
      E = function E() {
    var t = +this;

    if (v.hasOwnProperty(t)) {
      var e = v[t];
      delete v[t], e();
    }
  },
      _ = function _(t) {
    E.call(t.data);
  };

  d && h || (d = function d(t) {
    for (var e = [], n = 1; arguments.length > n;) {
      e.push(arguments[n++]);
    }

    return v[++m] = function () {
      s("function" == typeof t ? t : Function(t), e);
    }, i(m), m;
  }, h = function h(t) {
    delete v[t];
  }, "process" == n(28)(p) ? i = function i(t) {
    p.nextTick(a(E, t, 1));
  } : y && y.now ? i = function i(t) {
    y.now(a(E, t, 1));
  } : f ? (r = (o = new f()).port2, o.port1.onmessage = _, i = a(r.postMessage, r, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (i = function i(t) {
    u.postMessage(t + "", "*");
  }, u.addEventListener("message", _, !1)) : i = g in l("script") ? function (t) {
    c.appendChild(l("script"))[g] = function () {
      c.removeChild(this), E.call(t);
    };
  } : function (t) {
    setTimeout(a(E, t, 1), 0);
  }), t.exports = {
    set: d,
    clear: h
  };
}, function (t, e, n) {
  "use strict";

  var i = n(37);

  t.exports.f = function (t) {
    return new function (t) {
      var e, n;
      this.promise = new t(function (t, i) {
        if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");
        e = t, n = i;
      }), this.resolve = i(e), this.reject = i(n);
    }(t);
  };
},,, function (t, e, n) {
  var i = n(14),
      o = n(123);
  i(i.S + i.F * (Number.parseFloat != o), "Number", {
    parseFloat: o
  });
}, function (t, e, n) {
  var i = n(4).parseFloat,
      o = n(90).trim;
  t.exports = 1 / i(n(91) + "-0") != -1 / 0 ? function (t) {
    var e = o(String(t), 3),
        n = i(e);
    return 0 === n && "-" == e.charAt(0) ? -0 : n;
  } : i;
}, function (t, e, n) {
  var i = n(30),
      o = n(61),
      r = n(49),
      a = n(62),
      s = n(125);

  t.exports = function (t, e) {
    var n = 1 == t,
        c = 2 == t,
        l = 3 == t,
        u = 4 == t,
        p = 6 == t,
        d = 5 == t || p,
        h = e || s;
    return function (e, s, f) {
      for (var y, m, v = r(e), g = o(v), E = i(s, f, 3), _ = a(g.length), b = 0, I = n ? h(e, _) : c ? h(e, 0) : void 0; b < _; b++) {
        if ((d || b in g) && (m = E(y = g[b], b, v), t)) if (n) I[b] = m;else if (m) switch (t) {
          case 3:
            return !0;

          case 5:
            return y;

          case 6:
            return b;

          case 2:
            I.push(y);
        } else if (u) return !1;
      }

      return p ? -1 : l || u ? u : I;
    };
  };
}, function (t, e, n) {
  var i = n(126);

  t.exports = function (t, e) {
    return new (i(t))(e);
  };
}, function (t, e, n) {
  var i = n(6),
      o = n(83),
      r = n(5)("species");

  t.exports = function (t) {
    var e;
    return o(t) && ("function" != typeof (e = t.constructor) || e !== Array && !o(e.prototype) || (e = void 0), i(e) && null === (e = e[r]) && (e = void 0)), void 0 === e ? Array : e;
  };
}, function (t, e, n) {
  "use strict";

  var i,
      o,
      r,
      a,
      s = n(36),
      c = n(4),
      l = n(30),
      u = n(86),
      p = n(14),
      d = n(6),
      h = n(37),
      f = n(66),
      y = n(67),
      m = n(128),
      v = n(118).set,
      g = n(129)(),
      E = n(119),
      _ = n(130),
      b = n(131),
      I = n(132),
      S = "Promise",
      C = c.TypeError,
      A = c.process,
      P = A && A.versions,
      T = P && P.v8 || "",
      _w = c[S],
      O = "process" == u(A),
      N = function N() {},
      L = o = E.f,
      R = !!function () {
    try {
      var t = _w.resolve(1),
          e = (t.constructor = {})[n(5)("species")] = function (t) {
        t(N, N);
      };

      return (O || "function" == typeof PromiseRejectionEvent) && t.then(N) instanceof e && 0 !== T.indexOf("6.6") && -1 === b.indexOf("Chrome/66");
    } catch (t) {}
  }(),
      M = function M(t) {
    var e;
    return !(!d(t) || "function" != typeof (e = t.then)) && e;
  },
      k = function k(t, e) {
    if (!t._n) {
      t._n = !0;
      var n = t._c;
      g(function () {
        for (var i = t._v, o = 1 == t._s, r = 0, a = function a(e) {
          var n,
              r,
              a,
              s = o ? e.ok : e.fail,
              c = e.resolve,
              l = e.reject,
              u = e.domain;

          try {
            s ? (o || (2 == t._h && x(t), t._h = 1), !0 === s ? n = i : (u && u.enter(), n = s(i), u && (u.exit(), a = !0)), n === e.promise ? l(C("Promise-chain cycle")) : (r = M(n)) ? r.call(n, c, l) : c(n)) : l(i);
          } catch (e) {
            u && !a && u.exit(), l(e);
          }
        }; n.length > r;) {
          a(n[r++]);
        }

        t._c = [], t._n = !1, e && !t._h && D(t);
      });
    }
  },
      D = function D(t) {
    v.call(c, function () {
      var e,
          n,
          i,
          o = t._v,
          r = F(t);
      if (r && (e = _(function () {
        O ? A.emit("unhandledRejection", o, t) : (n = c.onunhandledrejection) ? n({
          promise: t,
          reason: o
        }) : (i = c.console) && i.error && i.error("Unhandled promise rejection", o);
      }), t._h = O || F(t) ? 2 : 1), t._a = void 0, r && e.e) throw e.v;
    });
  },
      F = function F(t) {
    return 1 !== t._h && 0 === (t._a || t._c).length;
  },
      x = function x(t) {
    v.call(c, function () {
      var e;
      O ? A.emit("rejectionHandled", t) : (e = c.onrejectionhandled) && e({
        promise: t,
        reason: t._v
      });
    });
  },
      q = function q(t) {
    var e = this;
    e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), k(e, !0));
  },
      G = function G(t) {
    var e,
        n = this;

    if (!n._d) {
      n._d = !0, n = n._w || n;

      try {
        if (n === t) throw C("Promise can't be resolved itself");
        (e = M(t)) ? g(function () {
          var i = {
            _w: n,
            _d: !1
          };

          try {
            e.call(t, l(G, i, 1), l(q, i, 1));
          } catch (t) {
            q.call(i, t);
          }
        }) : (n._v = t, n._s = 1, k(n, !1));
      } catch (t) {
        q.call({
          _w: n,
          _d: !1
        }, t);
      }
    }
  };

  R || (_w = function w(t) {
    f(this, _w, S, "_h"), h(t), i.call(this);

    try {
      t(l(G, this, 1), l(q, this, 1));
    } catch (t) {
      q.call(this, t);
    }
  }, (i = function i(t) {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(65)(_w.prototype, {
    then: function then(t, e) {
      var n = L(m(this, _w));
      return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = O ? A.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && k(this, !1), n.promise;
    },
    catch: function _catch(t) {
      return this.then(void 0, t);
    }
  }), r = function r() {
    var t = new i();
    this.promise = t, this.resolve = l(G, t, 1), this.reject = l(q, t, 1);
  }, E.f = L = function L(t) {
    return t === _w || t === a ? new r(t) : o(t);
  }), p(p.G + p.W + p.F * !R, {
    Promise: _w
  }), n(38)(_w, S), n(63)(S), a = n(27)[S], p(p.S + p.F * !R, S, {
    reject: function reject(t) {
      var e = L(this);
      return (0, e.reject)(t), e.promise;
    }
  }), p(p.S + p.F * (s || !R), S, {
    resolve: function resolve(t) {
      return I(s && this === a ? _w : this, t);
    }
  }), p(p.S + p.F * !(R && n(87)(function (t) {
    _w.all(t).catch(N);
  })), S, {
    all: function all(t) {
      var e = this,
          n = L(e),
          i = n.resolve,
          o = n.reject,
          r = _(function () {
        var n = [],
            r = 0,
            a = 1;
        y(t, !1, function (t) {
          var s = r++,
              c = !1;
          n.push(void 0), a++, e.resolve(t).then(function (t) {
            c || (c = !0, n[s] = t, --a || i(n));
          }, o);
        }), --a || i(n);
      });

      return r.e && o(r.v), n.promise;
    },
    race: function race(t) {
      var e = this,
          n = L(e),
          i = n.reject,
          o = _(function () {
        y(t, !1, function (t) {
          e.resolve(t).then(n.resolve, i);
        });
      });

      return o.e && i(o.v), n.promise;
    }
  });
}, function (t, e, n) {
  var i = n(12),
      o = n(37),
      r = n(5)("species");

  t.exports = function (t, e) {
    var n,
        a = i(t).constructor;
    return void 0 === a || null == (n = i(a)[r]) ? e : o(n);
  };
}, function (t, e, n) {
  var i = n(4),
      o = n(118).set,
      r = i.MutationObserver || i.WebKitMutationObserver,
      a = i.process,
      s = i.Promise,
      c = "process" == n(28)(a);

  t.exports = function () {
    var t,
        e,
        n,
        l = function l() {
      var i, o;

      for (c && (i = a.domain) && i.exit(); t;) {
        o = t.fn, t = t.next;

        try {
          o();
        } catch (i) {
          throw t ? n() : e = void 0, i;
        }
      }

      e = void 0, i && i.enter();
    };

    if (c) n = function n() {
      a.nextTick(l);
    };else if (!r || i.navigator && i.navigator.standalone) {
      if (s && s.resolve) {
        var u = s.resolve(void 0);

        n = function n() {
          u.then(l);
        };
      } else n = function n() {
        o.call(i, l);
      };
    } else {
      var p = !0,
          d = document.createTextNode("");
      new r(l).observe(d, {
        characterData: !0
      }), n = function n() {
        d.data = p = !p;
      };
    }
    return function (i) {
      var o = {
        fn: i,
        next: void 0
      };
      e && (e.next = o), t || (t = o, n()), e = o;
    };
  };
}, function (t, e) {
  t.exports = function (t) {
    try {
      return {
        e: !1,
        v: t()
      };
    } catch (t) {
      return {
        e: !0,
        v: t
      };
    }
  };
}, function (t, e, n) {
  var i = n(4).navigator;
  t.exports = i && i.userAgent || "";
}, function (t, e, n) {
  var i = n(12),
      o = n(6),
      r = n(119);

  t.exports = function (t, e) {
    if (i(t), o(e) && e.constructor === t) return e;
    var n = r.f(t);
    return (0, n.resolve)(e), n.promise;
  };
},,,, function (t, e, n) {
  "use strict";

  n.r(e), n(18), n(19), n(45), n(46), n(11), n(73);
  var i = n(1),
      o = n(29),
      r = n(2),
      a = i.a.url("https://pci-connect.squareup.com/v2/js-error");

  function s(t) {
    this.options = t || {}, this.source = this.options.source, this.applicationId = this.options.applicationId, this.apiWrapper = this.options.apiWrapper, this.ignoreError = 0, this.urlMatcher = /.+/, this.options.captureUncaughtExceptions && (this.options.captureUncaughtExceptions instanceof RegExp && (this.urlMatcher = this.options.captureUncaughtExceptions), this.install(window));
  }

  var c = s;
  s.prototype.destroy = function () {
    this.originalOnerror && (window.onerror = this.originalOnerror, this.originalOnerror = null);
  }, s.prototype.ignoreNextError = function () {
    this.ignoreError += 1, window.setTimeout(function () {
      this.ignoreError -= 1;
    }.bind(this), 0);
  }, s.prototype.wrap = function (t) {
    var e = this;
    if (t.__inner__) return t;

    function n() {
      var n = [].slice.call(arguments);

      try {
        return t.apply(this, n);
      } catch (n) {
        throw e.capture(n), n;
      }
    }

    return n.__inner__ = t, n;
  }, s.prototype.capture = function (t) {
    if (t.name || t.message) {
      t.message, this.ignoreNextError();

      var e = this._createPayload(t.name, t.message || "[unknown]", t.fileName || "[unknown]", t.stack);

      this._send(e);
    }
  }, s.prototype.install = function (t) {
    t.__error_logger__ || (t.__error_logger__ = !0, this.originalOnerror = t.onerror, t.onerror = function (e, n, i, o, a) {
      return this.ignoreError || /Script error/.test(e) || !this.urlMatcher.test(n) || (a || (a = "Syntax error" === e ? new SyntaxError("Unexpected syntax error") : new r.m(e)), this.capture(a)), "function" == typeof this.originalOnerror && this.originalOnerror.apply(t, [].slice.call(arguments));
    }.bind(this));
  }, s.prototype._createPayload = function (t, e, n, o) {
    var r = window;
    return {
      app_id: this.applicationId,
      type: t,
      message: e,
      stack: o,
      ua: r.navigator.userAgent,
      url: r.location.href,
      app_url: i.a.getParentLocation().href,
      script_url: n,
      source: this.source,
      wrapper: this.apiWrapper
    };
  }, s.prototype._send = function (t) {
    o.a.post(a, {
      json: t
    }, this._handleResponse.bind(this));
  }, s.prototype._handleResponse = function () {};
  var l = n(39),
      u = n(0),
      p = (n(15), n(23), n(13), n(80));

  function d(t, e, n) {
    this.type = t, this.options = e, this.callbacks = n, this.element = document.createElement("iframe"), this.element.onerror = this.onerror.bind(this), this.element.onload = this.onload.bind(this), this.setDefaultAttributes();
  }

  d.MIN_HEIGHT = 17, d.prototype.onerror = function (t) {
    "function" == typeof this.callbacks.onerror && this.callbacks.onerror(t);
  }, d.prototype.onload = function () {
    "function" == typeof this.callbacks.onload && this.callbacks.onload(this.type);
  }, d.prototype.destroy = function () {
    this.element.parentNode && (this.originalElement ? this.element.parentNode.replaceChild(this.originalElement, this.element) : this.element.parentNode.removeChild(this.element)), this.originalElement = null, this.element = null;
  }, d.prototype.setDefaultAttributes = function () {
    var t = this.element;
    t.setAttribute("id", this.options.elementId), t.setAttribute("name", this.name()), t.setAttribute("class", this.combinedClassName()), t.setAttribute("frameBorder", "0"), t.setAttribute("width", "100%"), t.setAttribute("scrolling", "no"), t.setAttribute("height", 17), t.setAttribute("src", this.iframeSRC());
  }, d.prototype.combinedClassName = function () {
    var t = [];
    return this.options.inputClass && t.push(this.options.inputClass), this.options.inheritedClassName && t.push(this.options.inheritedClassName), t.join(" ");
  }, d.prototype.iframeSRC = function () {
    return i.a.url("https://pci-connect.squareup.com/v2/iframe", this.queryParameters());
  }, d.prototype.queryParameters = function () {
    var t = {
      type: this.type
    };
    return this.options.appendQueryParams && (t.app_id = this.options.applicationId, this.options.locationId && (t.location_id = this.options.locationId), this.options.accountId && (t.account_id = this.options.accountId)), t;
  }, d.prototype.addClass = function (t) {
    this.element.classList.add(t);
  }, d.prototype.removeClass = function (t) {
    this.element.classList.remove(t);
  }, d.prototype.focus = function () {
    this.element.focus();
  }, d.prototype.name = function () {
    return this.options.elementId;
  };
  var h = d;

  var f = {
    allowPaymentRequest: "true",
    height: "0",
    width: "0",
    style: "border: none !important; display: block !important; visibility: hidden !important"
  },
      y = function () {
    function t(e) {
      !function (e, n) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this), this._options = e, this._errorLogger = this._options.errorLogger, this._id = this._options.formId, this._onload = this._options.onload, this._origin = this._options.targetOriginURL, this._ready = !1, this._window = null, this._iframe = this.createIframe();
    }

    return function (t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }(t.prototype, [{
      key: "destroy",
      value: function value() {
        this._ready = !1, this._window = null, this._iframe.destroy(), this._iframe = null;
      }
    }, {
      key: "send",
      value: function value(t) {
        this._ready && this._window && this._window.postMessage(t, this._origin);
      }
    }, {
      key: "createIframe",
      value: function value() {
        var t = {
          onerror: this.handleError.bind(this),
          onload: this.handleLoad.bind(this)
        },
            e = i.a.cloneObject(this._options);
        e.elementId = e.formId, e.appendQueryParams = !0;
        var n = new h("main", e, t);
        return Object.keys(f).forEach(function (t) {
          n.element.setAttribute(t, f[t]);
        }), document.body.appendChild(n.element), n;
      }
    }, {
      key: "handleError",
      value: function value(t) {
        this._ready = !1, this._errorLogger.capture(t);
      }
    }, {
      key: "handleLoad",
      value: function value() {
        this._ready = !0, this._window = this._iframe.element.contentWindow, this._onload();
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      }
    }, {
      key: "ready",
      get: function get() {
        return this._ready;
      }
    }, {
      key: "window",
      get: function get() {
        return this._window;
      }
    }]), t;
  }(),
      m = n(81);

  n(68);

  var v = function () {
    function t(e) {
      !function (e, n) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this), this._options = e, this._applicationId = e.applicationId, this._locationId = e.locationId, this._accountId = e.accountId, this._errorLogger = e.errorLogger, this._inputClass = e.inputClass, this._inputTypes = e.inputTypes, this._onload = e.onload, this._iframeControllers = {}, this._iframeNames = {}, this._loadedIframes = [], this._expectedLoadedFrames = Object.values(this._inputTypes), this._sendMessage = e.sendMessage, this._messageHandlers = e.messageHandlers, this._inputEventCallback = function () {}, e.callbacks && "function" == typeof e.callbacks.inputEventReceived && (this._inputEventCallback = e.callbacks.inputEventReceived), this._RESIZE_TIMEOUT_MS = 250;
    }

    return function (t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }(t.prototype, [{
      key: "build",
      value: function value() {
        var t = this;
        this._buildIframeControllers(), this._addResizeEventListener(), this._messageHandlers.add(u.a.events.SET_INPUT_HEIGHT, function (e) {
          t._setInputHeight(e.inputType, e.inputHeight);
        }), this._messageHandlers.add(u.a.events.INPUT_EVENT_RECEIVED, function (e) {
          t._inputEventReceived(e.inputEvent);
        });
      }
    }, {
      key: "destroy",
      value: function value() {
        for (var t in this._removeResizeEventListener(), this._removeTouchStartEventListener(), this._iframeControllers) {
          i.a.hasOwn(this._iframeControllers, t) && (this._iframeControllers[t].destroy(), delete this._iframeControllers[t]);
        }
      }
    }, {
      key: "focus",
      value: function value(t) {
        var e = !1;

        for (var n in this._inputTypes) {
          if (i.a.hasOwn(this._inputTypes, n) && t === this._inputTypes[n]) {
            e = !0;
            break;
          }
        }

        if (!e) {
          var o = new r.e(t);
          throw this._errorLogger.capture(o), o;
        }

        this._iframeControllers[t].focus();
      }
    }, {
      key: "_inputEventReceived",
      value: function value(t) {
        var e = this._iframeControllers[t.field];

        switch (t.eventType) {
          case u.a.inputEvents.ERROR_CLASS_ADDED:
            var n = this._classNameForClassType("error");

            e.addClass(n);
            break;

          case u.a.inputEvents.ERROR_CLASS_REMOVED:
            var i = this._classNameForClassType("error");

            e.removeClass(i);
            break;

          case u.a.inputEvents.FOCUS_CLASS_ADDED:
            var o = this._classNameForClassType("focus");

            e.addClass(o);
            break;

          case u.a.inputEvents.FOCUS_CLASS_REMOVED:
            var r = this._classNameForClassType("focus");

            e.removeClass(r);
        }

        this._inputEventCallback(t);
      }
    }, {
      key: "_classNameForClassType",
      value: function value(t) {
        return this._inputClass + "--" + t;
      }
    }, {
      key: "_setInputHeight",
      value: function value(t, e) {
        var n = this._iframeControllers[t].element,
            i = Math.max(e, h.MIN_HEIGHT);
        n.setAttribute("height", i), 0 !== e || this._inputHeightError || (this._inputHeightError = !0, this._errorLogger.capture(new r.d()));
      }
    }, {
      key: "_buildIframeControllers",
      value: function value() {
        for (var t in this._inputTypes) {
          if (i.a.hasOwn(this._inputTypes, t)) {
            var e = this._inputTypes[t];

            this._buildIframeController(e);
          }
        }
      }
    }, {
      key: "_buildIframeController",
      value: function value(t) {
        var e = this._options[t].elementId,
            n = this._getContainerElement(e),
            o = i.a.cloneObject(this._options[t]);

        o.inputClass = this._inputClass, o.inheritedClassName = n.className, o.applicationId = this._options.applicationId, o.locationId = this._options.locationId, o.accountId = this._options.accountId, this._iframeControllers[t] = new h(t, o, this._iframeCallbacks()), this._iframeNames[t] = this._iframeControllers[t].name(), (this._iframeControllers[t].originalElement = n).parentElement.replaceChild(this._iframeControllers[t].element, n);
      }
    }, {
      key: "_getContainerElement",
      value: function value(t) {
        var e = document.getElementById(t);
        if (!e) throw new r.a(t);
        var n = e.innerHTML;
        e.innerHTML = "!";
        var i = e.offsetHeight;
        return e.innerHTML = n, i <= 0 && window.console.warn(new r.b(t)), e;
      }
    }, {
      key: "_iframeCallbacks",
      value: function value() {
        var t = this;
        return {
          onload: function onload(e) {
            return t._addLoadedFrame(e);
          }
        };
      }
    }, {
      key: "_addLoadedFrame",
      value: function value(t) {
        -1 === this._loadedIframes.indexOf(t) && this._loadedIframes.push(t), this._loadedIframes.length === this._expectedLoadedFrames.length && (this._addTouchStartEventListener(), this._onload());
      }
    }, {
      key: "_addResizeEventListener",
      value: function value() {
        this._resizeCallback = this._updateStylesOnResize.bind(this), window.addEventListener("resize", this._resizeCallback);
      }
    }, {
      key: "_removeResizeEventListener",
      value: function value() {
        window.removeEventListener("resize", this._resizeCallback), clearTimeout(this.fireOnResizeEnd);
      }
    }, {
      key: "_updateStylesOnResize",
      value: function value() {
        clearTimeout(this.fireOnResizeEnd), this.fireOnResizeEnd = setTimeout(this._buildStylesForScreenWidth.bind(this), this._RESIZE_TIMEOUT_MS);
      }
    }, {
      key: "_buildStylesForScreenWidth",
      value: function value() {
        this._sendMessage({
          eventName: u.a.events.BUILD_STYLES_FOR_SCREEN_WIDTH,
          screenWidth: window.innerWidth
        });
      }
    }, {
      key: "_blurAllInputs",
      value: function value() {
        this._sendMessage({
          eventName: u.a.events.BLUR_ALL_INPUTS
        });
      }
    }, {
      key: "_addTouchStartEventListener",
      value: function value() {
        var t = this;
        this._touchcancelCallback = function () {
          t._touchStarted = !1;
        }, this._touchmoveCallback = function () {
          t._touchStarted = !1;
        }, this._touchstartCallback = function () {
          t._touchStarted = !0;
        }, this._touchendCallback = function () {
          t._touchStarted && t._blurAllInputs(), t._touchStarted = !1;
        }, window.addEventListener("touchstart", this._touchstartCallback), window.addEventListener("touchend", this._touchendCallback), window.addEventListener("touchmove", this._touchmoveCallback), window.addEventListener("touchcancel", this._touchcancelCallback);
      }
    }, {
      key: "_removeTouchStartEventListener",
      value: function value() {
        window.removeEventListener("touchstart", this._touchstartCallback), window.removeEventListener("touchend", this._touchendCallback), window.removeEventListener("touchmove", this._touchmoveCallback), window.removeEventListener("touchcancel", this._touchcancelCallback);
      }
    }, {
      key: "iframeNames",
      get: function get() {
        return this._iframeNames;
      }
    }]), t;
  }();

  function g(t) {
    return (g = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  n(89), n(122);

  var E = "SqLineItem",
      _ = function () {
    function t(e) {
      !function (e, n) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this), e && "object" === g(e) || (e = {}), this.data = {}, this.label = e.label, this.pending = e.pending, this.amount = e.amount;
    }

    return function (t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }(t.prototype, [{
      key: "toApplePayLineItem",
      value: function value() {
        return {
          label: this.data.label,
          type: this.data.pending ? "pending" : "final",
          amount: this.data.amount
        };
      }
    }, {
      key: "toGooglePayLineItem",
      value: function value() {
        return {
          label: this.data.label,
          type: "LINE_ITEM",
          price: this.data.amount,
          status: this.data.pending ? "PENDING" : "FINAL"
        };
      }
    }, {
      key: "toInstallmentsLineItem",
      value: function value() {
        return {
          label: this.data.label,
          amount: this.data.amount,
          pending: this.data.pending
        };
      }
    }, {
      key: "isValid",
      value: function value() {
        if ("object" !== g(this.data) || "string" != typeof this.data.label || "string" != typeof this.data.amount) return !1;
        var t = Number.parseFloat(this.data.amount);
        return !isNaN(t) && (void 0 === this.data.pending || "boolean" == typeof this.data.pending);
      }
    }, {
      key: "toBeacon",
      value: function value() {
        return {
          l: this.data.label,
          a: this.data.amount,
          p: this.data.pending
        };
      }
    }, {
      key: "label",
      get: function get() {
        return this.data.label;
      },
      set: function set(t) {
        i.a.isValidDataType("label", E, t, String), this.data.label = t;
      }
    }, {
      key: "pending",
      get: function get() {
        return this.data.pending;
      },
      set: function set(t) {
        null != t && i.a.isValidDataType("pending", E, t, Boolean) && (this.data.pending = t);
      }
    }, {
      key: "amount",
      get: function get() {
        return this.data.amount;
      },
      set: function set(t) {
        i.a.isValidDataType("amount", E, t, String), this.data.amount = t;
      }
    }]), t;
  }();

  function b(t) {
    return (b = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function I(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  var S = function () {
    function t(e) {
      !function (e, n) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this), e && "object" === b(e) || (e = {}), this.data = {}, this.id = e.id, this.label = e.label, this.amount = e.amount;
    }

    var e, n;
    return n = [{
      key: "fromApplePay",
      value: function value(e) {
        return e ? new t({
          id: e.identifier,
          label: e.label,
          amount: e.amount
        }) : e;
      }
    }], I((e = t).prototype, [{
      key: "toApplePay",
      value: function value() {
        return {
          label: this.data.label,
          detail: "",
          amount: this.data.amount,
          identifier: this.data.id
        };
      }
    }, {
      key: "toGooglePay",
      value: function value(t) {
        return {
          id: this.data.id,
          label: this.data.label,
          description: Intl.NumberFormat(l.a.language(), {
            style: "currency",
            currency: t
          }).format(this.amount)
        };
      }
    }, {
      key: "id",
      get: function get() {
        return this.data.id;
      },
      set: function set(t) {
        this.data.id = t;
      }
    }, {
      key: "label",
      get: function get() {
        return this.data.label;
      },
      set: function set(t) {
        this.data.label = t;
      }
    }, {
      key: "amount",
      get: function get() {
        return this.data.amount;
      },
      set: function set(t) {
        this.data.amount = t;
      }
    }]), I(e, n), t;
  }();

  function C(t) {
    return (C = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  var A = "PaymentDetailsUpdate",
      P = {
    addressLines: "addressLines",
    city: "locality",
    region: "administrativeArea",
    country: "countryCode",
    postalCode: "postalCode"
  },
      T = function () {
    function t(e) {
      !function (e, n) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this), e && "object" === C(e) || (e = {}), this.data = {}, this.error = e.error, this.shippingContactErrors = e.shippingContactErrors, this.total = e.total, this.lineItems = e.lineItems, this.shippingOptions = e.shippingOptions;
    }

    return function (t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }(t.prototype, [{
      key: "toApplePayShippingContactUpdate",
      value: function value(t) {
        return {
          errors: this._toApplePayErrors(),
          newShippingMethods: this._toApplePayShippingMethods(t.shippingMethods),
          newTotal: this._toApplePayTotal(t.total),
          newLineItems: this._toApplePayLineItems(t.lineItems)
        };
      }
    }, {
      key: "toCompleteShippingContactSelectionInputs",
      value: function value(t) {
        return {
          status: this._toApplePayStatusCode(),
          newShippingMethods: this._toApplePayShippingMethods(t.shippingMethods),
          newTotal: this._toApplePayTotal(t.total),
          newLineItems: this._toApplePayLineItems(t.lineItems)
        };
      }
    }, {
      key: "toApplePayShippingMethodUpdate",
      value: function value(t) {
        return {
          newTotal: this._toApplePayTotal(t.total),
          newLineItems: this._toApplePayLineItems(t.lineItems)
        };
      }
    }, {
      key: "toCompleteShippingMethodSelectionInputs",
      value: function value(t) {
        return {
          status: ApplePaySession.STATUS_SUCCESS,
          newTotal: this._toApplePayTotal(t.total),
          newLineItems: this._toApplePayLineItems(t.lineItems)
        };
      }
    }, {
      key: "_toApplePayErrors",
      value: function value() {
        var t = [];

        for (var e in this.data.error && t.push(new ApplePayError("addressUnserviceable", "postalAddress", this.data.error)), this.data.shippingContactErrors) {
          if (i.a.hasOwn(this.data.shippingContactErrors, e)) {
            var n = P[e] || "postalAddress";
            t.push(new ApplePayError("shippingContactInvalid", n, this.data.shippingContactErrors[e]));
          }
        }

        return t;
      }
    }, {
      key: "_toApplePayStatusCode",
      value: function value() {
        return this.data.error || this.data.shippingContactErrors ? ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS : ApplePaySession.STATUS_SUCCESS;
      }
    }, {
      key: "_toApplePayShippingMethods",
      value: function value(t) {
        return this.data.shippingOptions ? this.data.shippingOptions.map(function (t) {
          return t.toApplePay();
        }) : t;
      }
    }, {
      key: "_toApplePayTotal",
      value: function value(t) {
        return this.data.total ? this.data.total.toApplePayLineItem() : t || (window.console.error("Field `total` in PaymentDetailsUpdate is required."), null);
      }
    }, {
      key: "_toApplePayLineItems",
      value: function value(t) {
        return this.data.lineItems ? this.data.lineItems.map(function (t) {
          return t.toApplePayLineItem();
        }) : t;
      }
    }, {
      key: "toGooglePayErrors",
      value: function value(t) {
        var e = [];

        for (var n in this.data.error && e.push({
          reason: "SHIPPING_ADDRESS_UNSERVICEABLE",
          message: this.data.error,
          intent: t
        }), this.data.shippingContactErrors) {
          i.a.hasOwn(this.data.shippingContactErrors, n) && e.push({
            reason: "SHIPPING_ADDRESS_INVALID",
            message: n + ": " + this.data.shippingContactErrors[n],
            intent: t
          });
        }

        return e;
      }
    }, {
      key: "toInstallments",
      value: function value() {
        var t = {};
        return this.data.total && (t.total = this.data.total.toInstallmentsLineItem()), this.data.lineItems && (t.lineItems = this.data.lineItems.map(function (t) {
          return t.toInstallmentsLineItem();
        })), t;
      }
    }, {
      key: "validate",
      value: function value() {
        var t = [];
        return this.data.total && this.data.total.isValid() || t.push("total"), this.data.lineItems && this.data.lineItems.some(function (e) {
          if (!e.isValid()) return t.push("lineItems");
        }), t;
      }
    }, {
      key: "error",
      get: function get() {
        return this.data.error;
      },
      set: function set(t) {
        t && i.a.isValidDataType("error", A, t, String) && (this.data.error = t);
      }
    }, {
      key: "shippingContactErrors",
      get: function get() {
        return this.data.shippingContactErrors;
      },
      set: function set(t) {
        t && i.a.isValidDataType("shippingContactErrors", A, t, Object) && (this.data.shippingContactErrors = t);
      }
    }, {
      key: "total",
      get: function get() {
        return this.data.total;
      },
      set: function set(t) {
        t && i.a.isValidDataType("total", A, t, Object) && (this.data.total = new _(t));
      }
    }, {
      key: "lineItems",
      get: function get() {
        return this.data.lineItems;
      },
      set: function set(t) {
        t && i.a.isValidDataType("lineItems", A, t, Array) && (this.data.lineItems = t.map(function (t) {
          return new _(t);
        }));
      }
    }, {
      key: "shippingOptions",
      get: function get() {
        return this.data.shippingOptions;
      },
      set: function set(t) {
        t && i.a.isValidDataType("shippingOptions", A, t, Array) && (this.data.shippingOptions = t.map(function (t) {
          return new S(t);
        }));
      }
    }]), t;
  }(),
      w = n(22);

  function O(t) {
    return (O = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  n(117);

  var N = "SqPaymentRequest",
      L = function () {
    function t(e) {
      !function (e, n) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this), e && "object" === O(e) || (e = {}), this.data = {}, "boolean" == typeof e.requestEmailAddress && (this.data.requestEmailAddress = e.requestEmailAddress), this.currencyCode = e.currencyCode, this.countryCode = e.countryCode, this.total = e.total, this.shippingContact = e.shippingContact, this.shippingOptions = e.shippingOptions, this.lineItems = e.lineItems, this.requestShippingAddress = e.requestShippingAddress, this.requestBillingInfo = e.requestBillingInfo;
    }

    return function (t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }(t.prototype, [{
      key: "toApplePay",
      value: function value() {
        var t = {
          currencyCode: this.data.currencyCode,
          countryCode: this.data.countryCode,
          supportedNetworks: ["visa", "masterCard", "discover", "amex"],
          merchantCapabilities: ["supports3DS"],
          requiredBillingContactFields: ["postalAddress"]
        };
        return this.data.total && (t.total = this.data.total.toApplePayLineItem()), this.data.shippingContact instanceof w.a && (t.shippingContact = this.data.shippingContact.toApplePay()), this.data.shippingOptions ? t.shippingMethods = this.data.shippingOptions.map(function (t) {
          return t.toApplePay();
        }) : t.shippingMethods = [], this.data.lineItems ? t.lineItems = this.data.lineItems.map(function (t) {
          return t.toApplePayLineItem();
        }) : t.lineItems = [], this.data.requestBillingInfo && (t.requiredShippingContactFields = ["email", "name", "phone"]), this.data.requestShippingAddress && (t.requiredShippingContactFields = ["postalAddress", "name", "email", "phone"]), t;
      }
    }, {
      key: "toGooglePay",
      value: function value(t) {
        var e = this,
            n = i.a.cloneObject(t);
        return n.transactionInfo = {
          totalPriceLabel: this.data.total.label,
          totalPriceStatus: this.data.total.pending ? "ESTIMATED" : "FINAL",
          totalPrice: this.data.total.amount,
          currencyCode: this.data.currencyCode || "USD"
        }, Array.isArray(this.data.lineItems) && 0 < this.data.lineItems.length && (n.transactionInfo.displayItems = this.data.lineItems.map(function (t) {
          return t.toGooglePayLineItem();
        })), n.emailRequired = !!this.data.requestShippingAddress || !!this.data.requestEmailAddress, n.shippingAddressRequired = !!this.data.requestShippingAddress, n.shippingAddressParameters = {
          phoneNumberRequired: !!this.data.requestShippingAddress
        }, n.allowedPaymentMethods[0].parameters.billingAddressParameters = {
          format: "MIN",
          phoneNumberRequired: !!this.data.requestBillingInfo
        }, this.data.shippingOptions && (n.shippingOptionParameters = {
          shippingOptions: this.data.shippingOptions.map(function (t) {
            return t.toGooglePay(e.data.currencyCode);
          })
        }), n;
      }
    }, {
      key: "toGooglePayUpdate",
      value: function value(t) {
        var e = this,
            n = [];
        Array.isArray(this.data.lineItems) && 0 < this.data.lineItems.length && (n = this.data.lineItems.map(function (t) {
          return t.toGooglePayLineItem();
        }));
        var i,
            o,
            r,
            a,
            s = this.data.currencyCode;

        if (this.data.total) {
          var c = this.data.total.toGooglePayLineItem();
          i = c.label, r = c.price, o = c.status;
        }

        return this.data.shippingOptions && (a = {
          shippingOptions: this.data.shippingOptions.map(function (t) {
            return t.toGooglePay(e.data.currencyCode);
          })
        }, t && this.data.shippingOptions && this.data.shippingOptions.find(function (e) {
          return e.id === t;
        }) && (a.defaultSelectedOptionId = t)), {
          newTransactionInfo: {
            displayItems: n,
            currencyCode: s,
            totalPriceLabel: i,
            totalPrice: r,
            totalPriceStatus: o
          },
          newShippingOptionParameters: a
        };
      }
    }, {
      key: "toInstallments",
      value: function value() {
        var t = {
          currencyCode: this.data.currencyCode,
          countryCode: this.data.countryCode,
          total: this.data.total.toInstallmentsLineItem()
        };
        return this.data.lineItems ? t.lineItems = this.data.lineItems.map(function (t) {
          return t.toInstallmentsLineItem();
        }) : t.lineItems = [], t;
      }
    }, {
      key: "validate",
      value: function value() {
        var t = [];
        return "object" === O(this.data.total) && this.data.total.isValid() || t.push("total"), this.data.lineItems && this.data.lineItems.some(function (e) {
          if (!e.isValid()) return t.push("lineItems");
        }), t;
      }
    }, {
      key: "toBeacon",
      value: function value() {
        var t = {
          o: this.data.countryCode,
          u: this.data.currencyCode,
          t: this.data.total.toBeacon()
        };
        return this.data.lineItems && (t.l = this.data.lineItems.map(function (t) {
          return t.toBeacon();
        })), t;
      }
    }, {
      key: "currencyCode",
      get: function get() {
        return this.data.currencyCode;
      },
      set: function set(t) {
        t && i.a.isValidDataType("currencyCode", N, t, String) && (this.data.currencyCode = t);
      }
    }, {
      key: "countryCode",
      get: function get() {
        return this.data.countryCode;
      },
      set: function set(t) {
        t && i.a.isValidDataType("countryCode", N, t, String) && (this.data.countryCode = t);
      }
    }, {
      key: "total",
      get: function get() {
        return this.data.total;
      },
      set: function set(t) {
        t && i.a.isValidDataType("total", N, t, Object) && (this.data.total = new _(t));
      }
    }, {
      key: "shippingContact",
      get: function get() {
        return this.data.shippingContact;
      },
      set: function set(t) {
        t && i.a.isValidDataType("shippingContact", N, t, Object) && (this.data.shippingContact = new w.a(t));
      }
    }, {
      key: "shippingOptions",
      get: function get() {
        return this.data.shippingOptions;
      },
      set: function set(t) {
        t && i.a.isValidDataType("shippingOptions", N, t, Array) && (this.data.shippingOptions = t.map(function (t) {
          return new S(t);
        }));
      }
    }, {
      key: "lineItems",
      get: function get() {
        return this.data.lineItems;
      },
      set: function set(t) {
        t && i.a.isValidDataType("lineItems", N, t, Array) && (this.data.lineItems = t.map(function (t) {
          return new _(t);
        }));
      }
    }, {
      key: "requestShippingAddress",
      get: function get() {
        return this.data.requestShippingAddress;
      },
      set: function set(t) {
        null != t && i.a.isValidDataType("requestShippingAddress", N, t, Boolean) && (this.data.requestShippingAddress = t);
      }
    }, {
      key: "requestBillingInfo",
      get: function get() {
        return this.data.requestBillingInfo;
      },
      set: function set(t) {
        null != t && i.a.isValidDataType("requestBillingInfo", N, t, Boolean) && (this.data.requestBillingInfo = t);
      }
    }]), t;
  }();

  function R(t) {
    if (this.controller = t, this.options = t.options, this.callbacks = t.callbacks, this.controller.enabledDigitalWallets.indexOf(u.a.paymentMethods.APPLE_PAY) < 0) this.controller.enableMethod(u.a.paymentMethods.APPLE_PAY, !1);else if ("undefined" != typeof ApplePaySession) {
      if (this.isConfigValid()) {
        var e = this;
        this.applePayVersion = this.getSupportedApplePayVersion(), this.selectedShippingOption = null, this.validityPromise = ApplePaySession.canMakePaymentsWithActiveCard(this.getApplePayMerchantId()).then(function (t) {
          if (t) {
            var n = e.options.applePay.elementId;
            document.getElementById(n).addEventListener("click", e.requestPayment.bind(e)), e.controller.messageHandlers.add(u.a.events.RECEIVE_APPLE_PAY_VALID_MERCHANT, e.receiveApplePayValidMerchant.bind(e)), e.controller.messageHandlers.add(u.a.events.RECEIVE_APPLE_PAY_CARD_NONCE, e.receiveApplePayCardNonce.bind(e)), e.controller.sendEvent(u.a.events.LOAD_WALLET, u.a.paymentMethods.APPLE_PAY), e.controller.enableMethod(u.a.paymentMethods.APPLE_PAY, !0);
          } else e.controller.enableMethod(u.a.paymentMethods.APPLE_PAY, !1);
        }).catch(function () {
          e.controller.enableMethod(u.a.paymentMethods.APPLE_PAY, !1);
        });
      } else this.controller.enableMethod(u.a.paymentMethods.APPLE_PAY, !1);
    } else this.controller.enableMethod(u.a.paymentMethods.APPLE_PAY, !1);
  }

  R.prototype.isConfigValid = function () {
    if (!this.options.applePay || "function" != typeof this.callbacks.createPaymentRequest || "function" != typeof this.callbacks.cardNonceResponseReceived) return !1;
    var t = this.options.applePay.elementId;
    if (!document.getElementById(t)) throw new r.a(t);
    if (!this.options.locationId && !this.options.accountId) throw new r.j("locationId");
    var e = new r.n();

    if ("function" == typeof this.callbacks.validateShippingContact) {
      if ("function" == typeof this.callbacks.shippingContactChanged) throw e;
      window.console.error(e.message);
    }

    return !0;
  }, R.prototype.requestPayment = function () {
    if (!this.session) {
      var t = new L(this.callbacks.createPaymentRequest());
      this.applePayPaymentRequest = t.toApplePay(), t.shippingOptions && (this.selectedShippingOption = t.shippingOptions[0]), this.session = new ApplePaySession(this.applePayVersion, this.applePayPaymentRequest);
      var e = this;
      this.session.onvalidatemerchant = function (t) {
        e.requestApplePayMerchantValidity(t.validationURL, e.applePayPaymentRequest);
      }, "function" == typeof this.callbacks.shippingContactChanged ? this.session.onshippingcontactselected = function (t) {
        e._shippingContactChanged(t.shippingContact, e.applePayPaymentRequest);
      } : "function" == typeof this.callbacks.validateShippingContact && (this.session.onshippingcontactselected = function (t) {
        e._validateShippingContact(t.shippingContact, e.applePayPaymentRequest);
      }), this.session.onshippingmethodselected = function (t) {
        e.selectedShippingOption = S.fromApplePay(t.shippingMethod), e._shippingOptionChanged(e.selectedShippingOption, e.applePayPaymentRequest);
      }, this.session.onpaymentauthorized = function (t) {
        e.requestApplePayCardNonce(t.payment);
      }, this.session.oncancel = function () {
        delete e.session;
      }, this.session.begin();
    }
  }, R.prototype._shippingContactChanged = function (t, e) {
    var n = this,
        i = n.applePayVersion < 3 ? function (t) {
      var i = new T(t);
      n.selectedShippingOption = n.getDefaultShippingOption(i);
      var o = i.toCompleteShippingContactSelectionInputs(e);
      n.updateApplePayPaymentRequest(o), n.session.completeShippingContactSelection(o.status, o.newShippingMethods, o.newTotal, o.newLineItems);
    } : function (t) {
      var i = new T(t);
      n.selectedShippingOption = n.getDefaultShippingOption(i);
      var o = i.toApplePayShippingContactUpdate(e);
      n.updateApplePayPaymentRequest(o), n.session.completeShippingContactSelection(o);
    };
    this.callbacks.shippingContactChanged(w.a.fromApplePay(t), i);
  }, R.prototype._validateShippingContact = function (t, e) {
    var n = "function" == typeof this.callbacks.validateShippingContact && this.callbacks.validateShippingContact(w.a.legacyFromApplePay(t));

    if (this.applePayVersion < 3) {
      var i = n ? ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS : ApplePaySession.STATUS_SUCCESS;
      this.session.completeShippingContactSelection(i, [], e.total, []);
    } else {
      var o = n ? [new ApplePayError("shippingContactInvalid", "postalAddress", "Incorrect address")] : [];
      this.session.completeShippingContactSelection({
        errors: o,
        newTotal: e.total
      });
    }
  }, R.prototype._shippingOptionChanged = function (t, e) {
    var n = this,
        i = n.applePayVersion < 3 ? function (t) {
      var i = new T(t).toCompleteShippingMethodSelectionInputs(e);
      n.updateApplePayPaymentRequest(i), n.session.completeShippingMethodSelection(i.status, i.newTotal, i.newLineItems);
    } : function (t) {
      var i = new T(t).toApplePayShippingMethodUpdate(e);
      n.updateApplePayPaymentRequest(i), n.session.completeShippingMethodSelection(i);
    };
    "function" == typeof this.callbacks.shippingOptionChanged ? this.callbacks.shippingOptionChanged(t, i) : i();
  }, R.prototype.requestApplePayMerchantValidity = function (t, e) {
    var n = e && e.total ? e.total.label : null;
    if (this.options.accountId && !n) throw new r.k();
    this.controller.sendEvent(u.a.events.REQUEST_APPLE_PAY_MERCHANT_VALIDITY, {
      client_id: this.options.applicationId,
      location_id: this.options.locationId,
      account_id: this.options.accountId,
      merchant_name: n,
      validation_url: t,
      source_url: window.location.href
    });
  }, R.prototype.receiveApplePayValidMerchant = function (t) {
    var e = {
      detail: "Unable to start Apple Pay session."
    };

    if (void 0 !== this.session) {
      if (t.payload.sessionError) return t.payload.error && this.options.errorLogger.capture(Object(r.p)(t.payload.error)), this.callbacks.cardNonceResponseReceived([t.payload.sessionError || e]), void this.session.abort();
      var n;
      if (t.payload.session) try {
        n = JSON.parse(t.payload.session);
      } catch (t) {
        this.options.errorLogger.capture(t);
      }
      n ? this.session.completeMerchantValidation(n) : (this.callbacks.cardNonceResponseReceived([e]), this.session.abort());
    }
  }, R.prototype.requestApplePayCardNonce = function (t) {
    this.controller.sendEvent(u.a.events.REQUEST_APPLE_PAY_CARD_NONCE, {
      client_id: this.options.applicationId,
      applepay_data: t
    });
  }, R.prototype.receiveApplePayCardNonce = function (t) {
    var e = t.payload.nonceResponse;
    if (e.errors) return this.session.completePayment(this.session.STATUS_FAILURE), this.controller.callbacks.cardNonceResponseReceived(e.errors), delete this.session, !1;
    this.session.completePayment(this.session.STATUS_SUCCESS);
    var n = w.a.legacyFromApplePay(e.card.contact),
        i = w.a.legacyFromApplePay(e.shipping_contact);
    delete e.card.contact, this.controller.callbacks.cardNonceResponseReceived(null, e.card_nonce, e.card, n, i, this.selectedShippingOption), delete this.session;
  }, R.prototype.getApplePayMerchantId = function () {
    var t = this.options.applicationId,
        e = i.a.getParentLocation().hostname;
    return /(squareupstaging|squareupsandbox)\.com$/.test(e) ? t = "merchant.com.squareup.sdktest" : /squareup\.com$/.test(e) && (t = "merchant.com.squareup.sdk"), t;
  }, R.prototype.getSupportedApplePayVersion = function () {
    for (var t = 3; 0 < t && !ApplePaySession.supportsVersion(t);) {
      t--;
    }

    return t;
  }, R.prototype.getDefaultShippingOption = function (t) {
    return t.error || t.shippingContactErrors || !t.shippingOptions ? null : t.shippingOptions[0];
  }, R.prototype.updateApplePayPaymentRequest = function (t) {
    t.newTotal && (this.applePayPaymentRequest.total = t.newTotal), t.newLineItems && (this.applePayPaymentRequest.lineItems = t.newLineItems), t.newShippingMethods && (this.applePayPaymentRequest.shippingMethods = t.newShippingMethods);
  };
  var M = R,
      k = (n(127), n(9));

  function D(t) {
    this.controller = t, this.errorLogger = t.errorLogger, this.options = t.options, this.callbacks = t.callbacks, this.eventstream = t.eventstream, this.token = null, this.jsLoaded = null, this.enableMethodCalled = !1, this.paymentRequest = null, this.selectedShippingOptionId = null, this.controller.enabledDigitalWallets.indexOf(u.a.paymentMethods.GOOGLE_PAY) < 0 ? this.controller.enableMethod(u.a.paymentMethods.GOOGLE_PAY, !1) : this.isConfigValid() ? (this.fetchGooglePayJs(), this.controller.messageHandlers.add(u.a.events.RECEIVE_GOOGLE_PAY_CARD_NONCE, this.receiveGooglePayCardNonce.bind(this)), this.controller.messageHandlers.add(u.a.events.RECEIVE_GOOGLE_PAY_TOKEN, this.receiveGooglePayToken.bind(this)), this.controller.sendEvent(u.a.events.LOAD_WALLET, u.a.paymentMethods.GOOGLE_PAY)) : this.controller.enableMethod(u.a.paymentMethods.GOOGLE_PAY, !1);
  }

  D.prototype.isConfigValid = function () {
    if (!this.options.googlePay || "function" != typeof this.callbacks.createPaymentRequest || "function" != typeof this.callbacks.cardNonceResponseReceived) return !1;
    if (!this.getElement()) throw new r.a(this.options.googlePay.elementId);
    if (!this.getGatewayMerchantId()) throw new r.j("locationId");
    return !0;
  }, D.prototype.getElement = function () {
    return document.getElementById(this.options.googlePay.elementId);
  }, D.prototype.getGatewayMerchantId = function () {
    return this.options.locationId || this.options.accountId;
  }, D.prototype.fetchGooglePayJs = function () {
    var t = document.createElement("script");
    t.onload = this.googlePayJsFetched.bind(this), t.src = u.a.GOOGLE_PAY_JS, document.body.appendChild(t);
  }, D.prototype.googlePayJsFetched = function () {
    var t = this;

    if ("undefined" != typeof google) {
      this.paymentsClient = new google.payments.api.PaymentsClient({
        environment: "PRODUCTION"
      });
      var e = this.googlePayLoaded.bind(this);
      this.paymentsClient.isReadyToPay(this.buildBaseConfiguration()).then(function (t) {
        t.result ? e(!0) : e(!1);
      }).catch(function (n) {
        t.errorLogger.capture(n), e(!1);
      });
    } else this.googlePayLoaded(!1);
  }, D.prototype.googlePayLoaded = function (t) {
    this.jsLoaded = t, this.tryEnablingGooglePay();
  }, D.prototype.tryEnablingGooglePay = function () {
    !0 !== this.enableMethodCalled && (!1 === this.jsLoaded ? (this.controller.enableMethod(u.a.paymentMethods.GOOGLE_PAY, !1), this.enableMethodCalled = !0) : !0 === this.jsLoaded && null !== this.token && (this.getElement().addEventListener("click", this.requestPayment.bind(this)), this.controller.enableMethod(u.a.paymentMethods.GOOGLE_PAY, !0), this.enableMethodCalled = !0));
  }, D.prototype.requestPayment = function () {
    var t = this;
    this.paymentRequest = new L(this.callbacks.createPaymentRequest());
    var e = this.paymentRequest.validate();
    this.trackSqPaymentRequestValidationErrors(e);
    var n = this.paymentRequest.toGooglePay(this.buildBaseConfiguration()),
        i = this.requestGooglePayCardNonce.bind(this);
    this.paymentsClient.loadPaymentData(n).then(function (e) {
      e.apiVersion === n.apiVersion && e.apiVersionMinor === n.apiVersionMinor && (e.shippingOptionData && (t.selectedShippingOptionId = e.shippingOptionData.id), i(e));
    }).catch(function (e) {
      "CANCELED" !== e.statusCode && (console.error(e), t.errorLogger.capture(e));
    });
  }, D.prototype.receiveGooglePayToken = function (t) {
    var e = t.payload;
    e.errors || (this.token = e.token, this.tryEnablingGooglePay());
  }, D.prototype.requestGooglePayCardNonce = function (t) {
    this.controller.sendEvent(u.a.events.REQUEST_GOOGLE_PAY_CARD_NONCE, {
      googlepay_data: t
    });
  }, D.prototype.receiveGooglePayCardNonce = function (t) {
    var e = t.payload;
    if (e.errors) this.callbacks.cardNonceResponseReceived(e.errors);else {
      var n,
          i = w.a.fromGooglePay(e.billing_contact),
          o = w.a.fromGooglePay(e.shipping_contact);
      this.selectedShippingOptionId && (n = this.getShippingOption(this.selectedShippingOptionId)), this.callbacks.cardNonceResponseReceived(null, e.card_nonce, e.card, i, o, n);
    }
  }, D.prototype.onPaymentData = function (t) {
    var e = this;
    return t.shippingOptionData && (this.selectedShippingOptionId = t.shippingOptionData.id), this.callShippingContactChanged(t).then(function (n) {
      return e.callShippingOptionChanged(t).then(function (t) {
        var i = n.concat(t),
            o = e.paymentRequest.toGooglePayUpdate(e.selectedShippingOptionId);
        return 0 < i.length && (o.error = i[0]), o;
      });
    });
  }, D.prototype.callShippingContactChanged = function (t) {
    var e = this;
    return "SHIPPING_ADDRESS" !== t.callbackTrigger && "INITIALIZE" !== t.callbackTrigger ? Promise.resolve([]) : "function" != typeof this.callbacks.shippingContactChanged ? Promise.resolve([]) : new Promise(function (n) {
      e.selectedShippingOptionId = null;

      try {
        e.callbacks.shippingContactChanged(w.a.fromGooglePay(t.shippingAddress), function (t) {
          var i = new T(t),
              o = i.validate();
          e.trackPaymentDetailsUpdateValidationErrors(o), e.updatePaymentRequest(i), n(i.toGooglePayErrors("SHIPPING_ADDRESS"));
        });
      } catch (t) {
        throw console.error("callbacks.shippingContactChanged error", t), t;
      }
    });
  }, D.prototype.callShippingOptionChanged = function (t) {
    var e = this;
    return "SHIPPING_OPTION" !== t.callbackTrigger && "INITIALIZE" !== t.callbackTrigger ? Promise.resolve([]) : "function" != typeof this.callbacks.shippingOptionChanged ? Promise.resolve([]) : new Promise(function (t) {
      var n = e.getShippingOption(e.selectedShippingOptionId);

      try {
        e.callbacks.shippingOptionChanged(n, function (n) {
          var i = new T(n),
              o = i.validate();
          e.trackPaymentDetailsUpdateValidationErrors(o), e.updatePaymentRequest(i), t(i.toGooglePayErrors("SHIPPING_OPTION"));
        });
      } catch (n) {
        throw console.error("callbacks.shippingOptionChanged error", n), n;
      }
    });
  }, D.prototype.updatePaymentRequest = function (t) {
    t.lineItems && (this.paymentRequest.lineItems = t.lineItems.map(function (t) {
      return new _(t);
    })), t.total && (this.paymentRequest.total = new _(t.total)), t.shippingOptions && (this.paymentRequest.shippingOptions = t.shippingOptions.map(function (t) {
      return new S(t);
    }));
  }, D.prototype.getShippingOption = function (t) {
    if (!this.paymentRequest) {
      var e = new r.m("paymentRequest not persisted, possibly due to createPaymentRequest not being called");
      throw this.errorLogger.capture(e), e;
    }

    if (!Array.isArray(this.paymentRequest.shippingOptions) || 0 === this.paymentRequest.shippingOptions.length) {
      var n = Object(r.m)("persisted paymentRequest does not have any shippingOptions");
      throw this.errorLogger.capture(n), n;
    }

    var i = this.paymentRequest.shippingOptions.find(function (e) {
      return e.id === t;
    });
    return i || (i = this.paymentRequest.shippingOptions[0]), i;
  }, D.prototype.trackSqPaymentRequestValidationErrors = function (t) {
    var e = this;
    0 !== t.length && (t.forEach(function (t) {
      var n = {
        g: {
          a: "SQ_PAYMENT_REQUEST_VALIDATION:ERROR",
          e: t
        }
      };
      e.eventstream.track(k.a.GENERAL_EVENT, n);
    }), i.a.logInvalidFieldsError("PaymentRequest", t));
  }, D.prototype.trackPaymentDetailsUpdateValidationErrors = function (t) {
    var e = this;
    0 !== t.length && (t.forEach(function (t) {
      var n = {
        g: {
          a: "PAYMENT_DETAILS_UPDATE_VALIDATION:ERROR",
          e: t
        }
      };
      e.eventstream.track(k.a.GENERAL_EVENT, n);
    }), i.a.logInvalidFieldsError("PaymentDetailsUpdate", t));
  }, D.prototype.buildBaseConfiguration = function () {
    var t = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
          billingAddressRequired: !0
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "square",
            gatewayMerchantId: this.getGatewayMerchantId()
          }
        }
      }],
      merchantInfo: {
        merchantId: "05498866192997955200",
        authJwt: this.token
      }
    },
        e = [];
    return "function" == typeof this.callbacks.shippingContactChanged && e.push("SHIPPING_ADDRESS"), "function" == typeof this.callbacks.shippingOptionChanged && this.paymentRequest && Array.isArray(this.paymentRequest.shippingOptions) && 0 < this.paymentRequest.shippingOptions.length && e.push("SHIPPING_OPTION"), t;
  };
  var F = D;

  function x(t) {
    if (this.controller = t, this.options = t.options, this.controller.enabledDigitalWallets.indexOf(u.a.paymentMethods.MASTERPASS) < 0) this.controller.enableMethod(u.a.paymentMethods.MASTERPASS, !1);else if (this.options.masterpass && "function" == typeof this.controller.callbacks.createPaymentRequest && "function" == typeof this.controller.callbacks.cardNonceResponseReceived) {
      var e = this.options.masterpass.elementId;
      if (this.element = document.getElementById(e), !this.element) throw new r.a(e);
      this.checkoutId = "", this.cartId = "", this.masterpassWindow = null, this.controller.messageHandlers.add(u.a.events.RECEIVE_MASTERPASS_TRANSACTION, this.receiveTransaction.bind(this)), this.controller.messageHandlers.add(u.a.events.SET_MASTERPASS_CHECKOUT_ID, this.setCheckoutId.bind(this)), this.controller.sendEvent(u.a.events.LOAD_WALLET, u.a.paymentMethods.MASTERPASS);
    } else this.controller.enableMethod(u.a.paymentMethods.MASTERPASS, !1);
  }

  x.prototype.setCheckoutId = function (t) {
    this.checkoutId = t.checkoutId, this.element.addEventListener("click", this._requestPayment.bind(this)), this.controller.enableMethod(u.a.paymentMethods.MASTERPASS, !0);
  }, x.prototype._requestPayment = function () {
    if (!this.masterpassWindow || this.masterpassWindow.closed) {
      var t = this.controller.callbacks.createPaymentRequest();
      this.cartId = i.a.guid();
      var e = window.screen.width / 2 - 510,
          n = window.screen.height / 2 - 450;
      this.masterpassWindow = window.open("", "Masterpass", "width=1000,height=800,left=" + e + ",top=" + n + ",screenX=" + e + ",screenY=" + n + ",toolbar=no,menubar=no,scrollbars=no,location=yes,directories=no");
      var o = this.masterpassWindow.document;

      this._buildWindowContent(t, o);
    } else this.masterpassWindow.focus();
  }, x.prototype._buildWindowContent = function (t, e) {
    var n = t.total.amount,
        o = t.currencyCode,
        r = i.a.url("https://pci-connect.squareup.com/v2/masterpass/callback", {
      "formId": this.controller.formId
    }),
        a = {
      checkoutId: this.checkoutId,
      allowedCardTypes: ["visa", "masterCard", "discover", "amex"],
      amount: n,
      currency: o,
      suppress3Ds: !1,
      suppressShippingAddress: !t.requestShippingAddress,
      cartId: this.cartId,
      callbackUrl: r
    },
        s = e.createElement("script");
    s.setAttribute("type", "text/javascript"), s.innerText = "function start() { masterpass.checkout(".concat(JSON.stringify(a), "); }");
    var c = e.createElement("script");
    c.setAttribute("type", "text/javascript"), c.setAttribute("src", "https://static.masterpass.com/integration/merchant.js"), c.setAttribute("onload", "start()");
    var l = e.createElement("body");
    l.appendChild(s), l.appendChild(c), e.body = l;
  }, x.prototype.receiveTransaction = function (t) {
    this.masterpassWindow && (this.masterpassWindow.close(), this.masterpassWindow = null);
    var e = t.payload;
    if ("success" !== e.status) return !1;
    this.controller.sendEvent(u.a.events.REQUEST_MASTERPASS_CARD_NONCE, {
      client_id: this.options.applicationId,
      masterpass_data: {
        transaction_id: e.transactionId,
        cart_id: this.cartId
      }
    });
  };
  var q = x,
      G = (n(64), "installments"),
      j = {
    CHECKOUT: "checkout",
    CART: "cart",
    PRODUCT_DETAIL: "productDetail"
  },
      V = "VALIDATION_ERROR",
      U = "Error loading Capital JS",
      B = {
    INSTALLMENTS_APPLICATION_INELIGIBLE: {
      type: "INSTALLMENTS_APPLICATION_INELIGIBLE",
      message: "The merchant or this transaction is not eligible for Installments"
    },
    INSTALLMENTS_APPLICATION_DECLINED: {
      type: "INSTALLMENTS_APPLICATION_DECLINED",
      message: "The buyer Installments application was declined"
    },
    INSTALLMENTS_APPLICATION_CANCELLED: {
      type: "INSTALLMENTS_APPLICATION_CANCELLED",
      message: "The buyer cancelled the Installments application"
    },
    PAYMENT_DETAILS_UPDATE_INVALID: {
      type: "PAYMENT_DETAILS_UPDATE_INVALID",
      message: "The payment details update object provided is invalid"
    },
    INSTALLMENTS_NOT_READY: {
      type: "INSTALLMENTS_NOT_READY",
      message: "Installments has not finished loading"
    },
    UNKNOWN: {
      type: "UNKNOWN",
      message: "An unknown error has occurred"
    }
  };

  function H(t) {
    this.eventstream = t;
  }

  H.prototype.collectApplicationResult = function (t) {
    var e = {
      r: {
        s: t.status,
        o: void 0
      }
    };
    t.paymentOption && (e.r.o = {
      m: t.paymentOption.months,
      p: {
        a: t.paymentOption.payment.amount,
        c: t.paymentOption.payment.currency
      }
    }), this.eventstream.track(k.a.INSTALLMENTS_APPLICATION_RESULT_EVENT, e);
  }, H.prototype.collectConfiguration = function (t) {
    var e = {
      i: {
        m: t.modalType,
        c: t.isCustom,
        p: t.paymentRequest
      }
    };
    this.eventstream.track(k.a.INSTALLMENTS_CONFIG_EVENT, e);
  }, H.prototype.collectShowModalData = function (t) {
    var e = {
      m: {
        m: t.modalType,
        i: t.isShown,
        e: t.error
      }
    };
    this.eventstream.track(k.a.INSTALLMENTS_SHOW_MODAL_EVENT, e);
  };
  var W = H;

  function Y(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  }

  function K(t) {
    this.controller = t, this.options = t.options, this.callbacks = t.callbacks, this.eventstream = t.eventstream, this.installmentsEventstream = new W(this.eventstream), this._validateOptions() && this._fetchInstallmentsPayJs();
  }

  function z(t) {
    return (z = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  K.prototype._validateOptions = function () {
    if (!this.options.installments || "function" != typeof this.callbacks.createPaymentRequest || "function" != typeof this.callbacks.cardNonceResponseReceived) return this._enableInstallmentsMethod(!1, "Installments initialized incorrectly"), !1;
    if (!this.options.locationId) throw new r.j("locationId");
    if (this.modalType = this.options.installments.modalType || j.CHECKOUT, -1 === Object.values(j).indexOf(this.modalType)) throw new r.h("installments.modalType");
    return !0;
  }, K.prototype._fetchInstallmentsPayJs = function () {
    var t = document.createElement("script");
    t.onload = this._installmentsPayJsFetched.bind(this), t.onerror = function () {
      this._enableInstallmentsMethod(!1, U);
    }.bind(this), t.src = "https://installments-ad-production-f.squarecdn.com/production/capital-installments-production-0.2.1.js", t.integrity = "sha256-8FKXoWT6A5o1q1wEhfFuqyH4BW9BH4g/tdzTN754Bfs= sha384-6OPJ1kGuRn1sxd4oCpbjTGD32Z1DgfmzrHzUxjAzJcX2NhjpI6nvL2KOWtiFGDFi sha512-GzISd3eYgRUkFPTMCiheFQxNbckf2gcI3+xn7TZEU7KjvngCFsAqitMPHZporqi7P9nyyWMl5wVNp2MBuCoCGw==", t.crossOrigin = "anonymous", document.body.appendChild(t);
  }, K.prototype._installmentsPayJsFetched = function () {
    "undefined" != typeof CapitalInstallments ? this._enableInstallments() : this._enableInstallmentsMethod(!1, U);
  }, K.prototype._enableInstallments = function () {
    var t,
        e,
        n = this,
        o = new L(this.callbacks.createPaymentRequest()),
        r = (e = (t = o).validate(), "US" !== t.countryCode && -1 === e.indexOf("countryCode") && e.push("countryCode"), "USD" !== t.currencyCode && -1 === e.indexOf("currencyCode") && e.push("currencyCode"), e);
    if (0 < r.length) return i.a.logInvalidFieldsError("PaymentRequest", r), void this._enableInstallmentsMethod(!1, "The payment request object provided is invalid");
    var a = o.toInstallments();
    this.installmentsEventstream.collectConfiguration({
      modalType: this.modalType,
      isCustom: !0,
      paymentRequest: o.toBeacon()
    });

    try {
      this.capitalClient = new CapitalInstallments({
        applicationId: this.options.applicationId,
        locationId: this.options.locationId,
        sessionId: this.eventstream.sessionId,
        config: {
          modalType: this.modalType
        },
        paymentRequest: a,
        onNonceResponse: this._nonceResponseReceived.bind(this)
      });
    } catch (t) {
      if (this._enableInstallmentsMethod(!1, "Error initializing Capital JS"), t.type === V) {
        var s = [];
        t.validationErrors.forEach(function (t) {
          var e = t.attribute.split(".");
          "paymentRequest" === e[0] && 2 === e.length && s.push(e[1]);
        }), 0 < s.length && i.a.logInvalidFieldsError("PaymentRequest", s);
      }

      return;
    }

    this.capitalClient.load(), this.capitalClient.checkMerchantEligibility().then(function (t) {
      t.success ? n._enableInstallmentsMethod(!0, "Merchant eligible for Installments") : n._enableInstallmentsMethod(!1, "Merchant is not eligible for Installments");
    }).catch(function () {
      n._enableInstallmentsMethod(!1, "unknown");
    });
  }, K.prototype.updatePaymentDetails = function (t, e) {
    if (this.capitalClient) {
      var n = new T(t),
          o = n.validate();
      if (0 < o.length) return i.a.logInvalidFieldsError("PaymentDetailsUpdate", o), void e([B.PAYMENT_DETAILS_UPDATE_INVALID], !1);
      var r = n.toInstallments();
      this.capitalClient.updatePaymentRequest(r).then(function (t) {
        t.eligible ? e(null, !0) : e([B.INSTALLMENTS_APPLICATION_INELIGIBLE], !1);
      }).catch(function (t) {
        switch (t.type) {
          case V:
            return void e([B.PAYMENT_DETAILS_UPDATE_INVALID], !1);

          default:
            return void e([B.UNKNOWN], !1);
        }
      });
    } else e([B.INSTALLMENTS_NOT_READY], !1);
  }, K.prototype.getInstallmentsPricing = function (t) {
    this.capitalClient ? this.capitalClient.getPricing().then(function (e) {
      t(null, e);
    }).catch(function (e) {
      "FINANCING_NOT_AVAILABLE" !== e.type ? t([B.UNKNOWN]) : t([B.INSTALLMENTS_APPLICATION_INELIGIBLE]);
    }) : t([B.INSTALLMENTS_NOT_READY]);
  }, K.prototype.showInstallmentsModal = function () {
    var t = this;

    if (!this.capitalClient) {
      var e = B.INSTALLMENTS_NOT_READY;
      return this._sendInstallmentsShowModalData(!1, e.type), void this.callbacks.cardNonceResponseReceived([e]);
    }

    var n = this;
    this.capitalClient.showModal().then(function () {
      n._sendInstallmentsShowModalData(!0);
    }).catch(function (e) {
      if ("MERCHANT_NOT_ELIGIBLE" === e.type) {
        var i = B.INSTALLMENTS_APPLICATION_INELIGIBLE;
        return n._sendInstallmentsShowModalData(!1, i.type), void t.callbacks.cardNonceResponseReceived([i]);
      }

      t.callbacks.cardNonceResponseReceived([B.UNKNOWN]);
    });
  }, K.prototype._sendInstallmentsShowModalData = function (t, e) {
    var n = {
      modalType: this.modalType,
      isShown: t,
      err: e
    };
    this.installmentsEventstream.collectShowModalData(n);
  }, K.prototype._nonceResponseReceived = function (t, e) {
    var n;
    if (t) return this.callbacks.cardNonceResponseReceived([B.UNKNOWN]), this.installmentsEventstream.collectApplicationResult({
      status: B.UNKNOWN.type
    }), void this.options.errorLogger.capture({
      name: "UnknownInstallmentsResultError",
      message: t
    });
    if ("COMPLETED" === e.status) return this.callbacks.cardNonceResponseReceived(null, e.nonce, {
      paymentOption: e.paymentOption
    }), void this.installmentsEventstream.collectApplicationResult({
      status: e.status,
      paymentOption: e.paymentOption
    });
    var i = (Y(n = {}, "DENIED", B.INSTALLMENTS_APPLICATION_DECLINED), Y(n, "CANCELLED", B.INSTALLMENTS_APPLICATION_CANCELLED), n);
    this.callbacks.cardNonceResponseReceived([i[e.status] || B.UNKNOWN]), this.installmentsEventstream.collectApplicationResult({
      status: i[e.status] ? e.status : B.UNKNOWN.type
    });
  }, K.prototype._enableInstallmentsMethod = function (t, e) {
    this.controller.enableMethod(G, t, e);
  };
  var J = "https://pci-connect.squareup.com";

  function Q(t) {
    this.options = t, this.applicationId = t.applicationId, this.locationId = t.locationId, this.accountId = t.accountId, this.callbacks = t.callbacks, this.apiWrapper = t.apiWrapper, this.websiteUrl = t.websiteUrl, this.errorLogger = t.errorLogger, this.eventstream = this.options.eventstream, this.telemetry = new m.a(this.eventstream), this._initialize(t);
  }

  Q.DIGITAL_WALLETS = {
    applePay: M,
    googlePay: F,
    masterpass: q,
    installments: K
  }, Q.prototype._initialize = function (t) {
    this.formId = i.a.guid(), this.messageBuffer = [], this.messageHandlers = new p.a(), this._paymentMethods = {}, this.expectedPaymentMethods = t.expectedPaymentMethods, this.inputTypes = i.a.cloneObject(t.expectedInputTypes), this.autoFill = "boolean" != typeof t.autoFill || t.autoFill, this.loadedWallets = {}, this.digitalWallets = {}, -1 === this.expectedPaymentMethods.indexOf(u.a.paymentMethods.GIFT_CARD) && (this.digitalWallets = i.a.cloneObject(Q.DIGITAL_WALLETS));
  }, Q.prototype.paymentMethod = function (t) {
    if (this._paymentMethods[t]) return this._paymentMethods[t];
  }, Q.prototype.build = function () {
    var t = this;
    void 0 === this._buildAt && (this._buildAt = Date.now(), this.mainIframe = this.createMainIframe(function () {
      return t.mainIframeLoaded();
    }));
  }, Q.prototype.createMainIframe = function (t) {
    var e = {
      accountId: this.accountId,
      applicationId: this.applicationId,
      locationId: this.locationId,
      formId: this.formId,
      targetOriginURL: J,
      onload: t
    };
    return new y(e);
  }, Q.prototype.initializePaymentMethod = function (t) {
    switch (t) {
      case u.a.paymentMethods.GIFT_CARD:
      case u.a.paymentMethods.KEYED_CARD:
        var e = i.a.cloneObject(this.options);
        e.inputTypes = i.a.cloneObject(this.inputTypes), e.onload = this.loadFormController.bind(this), e.sendMessage = this.sendIframeMessage.bind(this), e.messageHandlers = this.messageHandlers;
        var n = new v(e);
        n.build(), this._paymentMethods[t] = n;
    }
  }, Q.prototype.mainIframeLoaded = function () {
    -1 < this.expectedPaymentMethods.indexOf(u.a.paymentMethods.KEYED_CARD) ? this.initializePaymentMethod(u.a.paymentMethods.KEYED_CARD) : -1 < this.expectedPaymentMethods.indexOf(u.a.paymentMethods.GIFT_CARD) ? this.initializePaymentMethod(u.a.paymentMethods.GIFT_CARD) : this.loadFormController();
  }, Q.prototype.pluginShim = function () {
    var t = this;
    return {
      options: this.options,
      formId: this.formId,
      enabledDigitalWallets: this.enabledDigitalWallets || "",
      callbacks: this.callbacks,
      messageHandlers: this.messageHandlers,
      enableMethod: this.enableMethod.bind(this),
      sendEvent: function sendEvent(e, n) {
        t.sendIframeMessage({
          eventName: e,
          payload: n
        });
      },
      errorLogger: this.errorLogger,
      eventstream: this.eventstream
    };
  }, Q.prototype.enableMethod = function (t, e) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "",
        i = {};
    (i[t] = e) || delete this.loadedWallets[t], this.callbacks && "function" == typeof this.callbacks.methodsSupported && this.callbacks.methodsSupported(i), this._collectMethodsSupportedData({
      type: t,
      isSupported: e,
      reason: n
    });
  }, Q.prototype._collectMethodsSupportedData = function (t) {
    var e = {
      p: {
        t: t.type,
        s: t.isSupported,
        r: t.reason
      }
    };
    this.eventstream.track(k.a.METHODS_SUPPORTED_EVENT, e);
  }, Q.prototype.buildStylesForScreenWidth = function () {
    var t = this.paymentMethod(u.a.paymentMethods.KEYED_CARD);
    t && t._buildStylesForScreenWidth();
  }, Q.prototype.destroy = function () {
    for (var t in this.removePostMessageEventListeners(), this._paymentMethods) {
      i.a.hasOwn(this._paymentMethods, t) && (this._paymentMethods[t].destroy(), delete this._paymentMethods[t]);
    }

    this.mainIframe && (this.mainIframe.destroy(), delete this.mainIframe);
  }, Q.prototype.receiveMessageCallback = function (t) {
    if (t.origin === J && t.data.formId === this.formId) {
      switch (t.data.eventName) {
        case u.a.events.CARD_NONCE_RESPONSE_RECEIVED:
          this.options.callbacks && "function" == typeof this.options.callbacks.cardNonceResponseReceived && this.options.callbacks.cardNonceResponseReceived(t.data.value.errors, t.data.value.card_nonce, t.data.value.card, t.data.value.billing_contact, t.data.value.shipping_contact);
          break;

        case u.a.events.PAYMENT_FORM_LOADED:
          this._loadedAt = Date.now(), this.sessionId = t.data.sessionId, this.eventstream.sessionId = this.sessionId, this.enabledDigitalWallets = t.data.enabledDigitalWallets;
          var e = this.pluginShim();

          for (var n in this.digitalWallets) {
            i.a.hasOwn(this.digitalWallets, n) && (this.loadedWallets[n] = new this.digitalWallets[n](e));
          }

          var o = this._loadedAt - this._buildAt;

          for (this.telemetry.collectLoadTiming({
            tti: o
          }), this.telemetry.collectConfiguration(i.a.cloneObject(this.options)), this.options.callbacks && "function" == typeof this.options.callbacks.paymentFormLoaded && this.options.callbacks.paymentFormLoaded(); 0 < this.messageBuffer.length;) {
            this.sendIframeMessage(this.messageBuffer.pop());
          }

      }

      this.messageHandlers.handle(t.data.eventName, t.data);
    }
  }, Q.prototype.addPostMessageEventListeners = function () {
    this._messageCallback = this.receiveMessageCallback.bind(this), window.addEventListener("message", this._messageCallback);
  }, Q.prototype.removePostMessageEventListeners = function () {
    window.removeEventListener("message", this._messageCallback);
  }, Q.prototype.sendIframeMessage = function (t) {
    if (t.formId = this.formId, this.mainIframe && this.mainIframe.ready) return this.mainIframe.window ? void this.mainIframe.send(t) : void window.console.warn(new r.c("main"));
    this.messageBuffer.push(t);
  }, Q.prototype.loadFormController = function () {
    var t = {
      version: "ed00de08e6",
      hostOrigin: function () {
        var t = window.location;
        if (t.origin) return t.origin;
        if (t.protocol && t.host) return t.protocol + "//" + t.host;
        throw new r.i("Error accessing the current origin.");
      }(),
      applicationId: this.applicationId,
      locationId: this.locationId,
      accountId: this.accountId,
      apiWrapper: this.apiWrapper,
      websiteUrl: this.websiteUrl,
      expectedPaymentMethods: this.expectedPaymentMethods,
      googlePayTokenUrl: document.location.href
    },
        e = this.paymentMethod(u.a.paymentMethods.GIFT_CARD),
        n = this.paymentMethod(u.a.paymentMethods.KEYED_CARD);
    (e || n) && (t.keyedCard = {
      autoFill: this.autoFill,
      iframeNames: (e || n).iframeNames,
      inputStyles: this.options.inputStyles,
      inputTypes: this.inputTypes,
      initialScreenWidth: window.innerWidth
    }, Object.keys(this.inputTypes).forEach(function (e) {
      var n = this.inputTypes[e];
      t.keyedCard[n] = this.options[n];
    }, this));
    var i = {
      eventName: u.a.events.LOAD_FORM_CONTROLLER,
      options: t
    };
    this.addPostMessageEventListeners(), this.sendIframeMessage(i);
  }, Q.prototype.requestCardNonceIfValidForm = function () {
    this.sendIframeMessage({
      eventName: u.a.events.REQUEST_CARD_NONCE_IF_VALID_FORM
    });
  }, Q.prototype.setPostalCode = function (t) {
    var e = z(t);
    "string" !== e && "number" !== e || this.sendIframeMessage({
      eventName: u.a.events.SET_POSTAL_CODE,
      postalCode: "" + t
    });
  }, Q.prototype.hasLoaded = function () {
    return !!this._loadedAt;
  }, Q.prototype.getInstallmentsPricing = function (t) {
    var e = this.loadedWallets.installments;
    e ? e.getInstallmentsPricing(t) : t([B.INSTALLMENTS_APPLICATION_INELIGIBLE]);
  }, Q.prototype.showInstallmentsModal = function () {
    var t = this.loadedWallets.installments;
    t ? t.showInstallmentsModal() : this.callbacks.cardNonceResponseReceived([B.INSTALLMENTS_APPLICATION_INELIGIBLE]);
  }, Q.prototype.updatePaymentDetails = function (t, e) {
    var n = this.loadedWallets.installments;
    n ? n.updatePaymentDetails(t, e) : e([B.INSTALLMENTS_APPLICATION_INELIGIBLE], !1);
  };
  var Z = Q;

  function X(t) {
    return (X = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function $(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function tt(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function et(t, e, n) {
    return e && tt(t.prototype, e), n && tt(t, n), t;
  }

  n(50);

  var nt = function () {
    function t(e) {
      $(this, t), e && "object" === X(e) || (e = {}), this._applicationId = e.applicationId, this._locationId = e.locationId, this._accountId = e.accountId;
    }

    return et(t, [{
      key: "verifyBuyer",
      value: function value(t, e, n) {
        var i = new ot(this._applicationId, this._accountId, this._locationId, t, e),
            o = this._generateToken(i);

        o ? n(null, new it(o)) : n(new r.m("Unable to generate token."));
      }
    }, {
      key: "_generateToken",
      value: function value(t) {
        var e = "".concat(t._locationId, "-fake-verification-token-").concat(Date.now());
        return this._base64encode(e.replace(/-/g, "")).replace(/=/g, "");
      }
    }, {
      key: "_base64encode",
      value: function value(t) {
        return window.btoa("" + t);
      }
    }]), t;
  }(),
      it = function () {
    function t(e) {
      $(this, t), this._token = e;
    }

    return et(t, [{
      key: "toString",
      value: function value() {
        return this._token;
      }
    }, {
      key: "token",
      get: function get() {
        return this._token;
      }
    }, {
      key: "userChallenged",
      get: function get() {
        return !1;
      }
    }]), t;
  }(),
      ot = function () {
    function t(e, n, i, o, r) {
      $(this, t), this.applicationId = e, this.accountId = n, this.locationId = i, this.source = o, this.details = r;
    }

    return et(t, [{
      key: "toJSON",
      value: function value() {
        return JSON.stringify({
          applicationId: this.applicationId,
          accountId: this.accountId,
          locationId: this.locationId,
          source: this.source,
          details: this.details
        });
      }
    }]), t;
  }();

  function rt(t) {
    return (rt = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function at(t) {
    this.options = t, this.errorLogger = new c({
      applicationId: this.options && this.options.applicationId,
      apiWrapper: this.options && this.options.apiWrapper,
      captureUncaughtExceptions: !1,
      source: "SqPaymentForm"
    });
    var e = this.validateOptions(this.options);
    if (e) throw this.errorLogger.capture(e), e;

    if (!i.a.embeddingAllowed(window.location)) {
      var n = new r.o.HttpsRequiredError();
      throw this.errorLogger.capture(n), n;
    }

    this.eventstream = new k.b({
      applicationId: this.options.applicationId,
      locationId: this.options.locationId,
      accountId: this.options.accountId,
      apiWrapper: this.options.apiWrapper
    });
    var o = Object.assign({}, this.options, {
      errorLogger: this.errorLogger,
      eventstream: this.eventstream,
      expectedPaymentMethods: this._detectPaymentMethods(this.options)
    });
    this.clientController = new Z(o), !1 !== this.options.autoBuild && this._attachLoadListener();
  }

  at.isSupportedBrowser = l.a.supported.bind(null), at.prototype._attachLoadListener = function () {
    this._handleDomContentLoaded = this.build.bind(this), l.a.ie10() ? window.addEventListener("load", this._handleDomContentLoaded) : "loading" === document.readyState && document.addEventListener("DOMContentLoaded", this._handleDomContentLoaded);
  }, at.prototype.build = function () {
    if (this.detachLoadEvent(), this.build = function () {
      var t = new r.o.FormAlreadyBuiltError();
      throw this.errorLogger.capture(t), t;
    }, !at.isSupportedBrowser()) return this.errorLogger.capture(new r.o.UnsupportedBrowserError()), void (this.options.callbacks && "function" == typeof this.options.callbacks.unsupportedBrowserDetected && this.options.callbacks.unsupportedBrowserDetected());

    try {
      this.clientController.build();
    } catch (t) {
      throw this.errorLogger.capture(t), t;
    }
  }, at.prototype.destroy = function () {
    this.detachLoadEvent(), this.clientController && (this.clientController.destroy(), this.clientController = null), this.errorLogger.destroy(), this.errorLogger = null, this.build = function () {
      throw new r.o.FormAlreadyDestroyedError("build");
    }, this.requestCardNonce = function () {
      throw new r.o.FormAlreadyDestroyedError("requestCardNonce");
    };
  }, at.prototype.requestCardNonce = function () {
    if (!this.clientController.hasLoaded()) {
      var t = new r.o.FormNotReadyError("requestCardNonce");
      throw this.errorLogger.capture(t), t;
    }

    if (0 === this.clientController.expectedPaymentMethods.length) {
      var e = new r.o.MissingPaymentMethodError();
      throw this.errorLogger.capture(e), e;
    }

    this.clientController.requestCardNonceIfValidForm();
  }, at.prototype.recalculateSize = function () {
    this.clientController.buildStylesForScreenWidth();
  }, at.prototype.setPostalCode = function (t) {
    this.clientController.setPostalCode(t);
  }, at.prototype.focus = function (t) {
    if (!this.clientController.hasLoaded()) {
      var e = new r.o.FormNotReadyError("focus");
      throw this.errorLogger.capture(e), e;
    }

    var n = this.clientController.paymentMethod(u.a.paymentMethods.KEYED_CARD);
    n && n.focus(t);
  }, at.prototype.getInstallmentsPricing = function (t) {
    var e;
    if (void 0 === t || "function" != typeof t ? e = new r.o.InvalidFunctionArgumentError("getInstallmentsPricing") : this.clientController.hasLoaded() || (e = new r.o.FormNotReadyError("getInstallmentsPricing")), e) throw this.errorLogger.capture(e), e;
    this.clientController.getInstallmentsPricing(t);
  }, at.prototype.updatePaymentRequest = function (t, e) {
    var n;
    if (void 0 === t || "object" !== rt(t) || void 0 === e || "function" != typeof e ? n = new r.o.InvalidFunctionArgumentError("updatePaymentRequest") : this.clientController.hasLoaded() || (n = new r.o.FormNotReadyError("updatePaymentRequest")), n) throw this.errorLogger.capture(n), n;
    this.clientController.updatePaymentDetails(t, e);
  }, at.prototype.showInstallmentsModal = function () {
    if (!this.clientController.hasLoaded()) {
      var t = new r.o.FormNotReadyError("showInstallmentsModal");
      throw this.errorLogger.capture(t), t;
    }

    this.clientController.showInstallmentsModal();
  }, at.prototype.verifyBuyer = function (t, e, n) {
    var i = this;
    if (this._trackVerificationRequested(), !this.options.locationId && !this.options.accountId) throw this._trackVerificationError("No location id given"), new TypeError("`locationId` is required");
    if (!t || "string" != typeof t) throw this._trackVerificationError("Invalid source"), new TypeError("`source` is required and must be a string");
    if (e && "object" === rt(e) || (this._trackVerificationError("Invalid verification details"), new TypeError("`verificationDetails` is required and must be an object")), "function" != typeof n) throw this._trackVerificationError("Invalid callback"), new TypeError("`callback` is required and must be a function");
    e = this._validateVerificationDetails(e), new nt({
      applicationId: this.applicationId,
      locationId: this.locationId,
      accountId: this.accountId
    }).verifyBuyer(t, e, function (t, e) {
      t && i._trackVerificationError(t.message), e ? i._trackVerificationSuccess() : i._trackVerificationError("No token generated"), n(t, e);
    });
  }, at.prototype._validateVerificationDetails = function (t) {
    var e = rt(t.intent);
    if ("undefined" === e ? t.intent = "CHARGE" : "string" === e && (t.intent = t.intent.toUpperCase()), "CHARGE" !== t.intent && "STORE" !== t.intent) throw this._trackVerificationError("Invalid intent value"), new TypeError('`verificationDetails.intent` must be one of "CHARGE" or "STORE"');
    var n = rt(t.amount),
        i = rt(t.currencyCode);

    if ("STORE" === t.intent) {
      if ("undefined" !== n) throw this._trackVerificationError("Unnececessary amount given for STORE"), new TypeError('`verificationDetails.amount` is not necessary when `intent` is "STORE"');
      if ("undefined" !== i) throw this._trackVerificationError("Unnececessary currencyCode given for STORE"), new TypeError('`verificationDetails.currencyCode` is not necessary when `intent` is "STORE"');
    }

    if ("CHARGE" === t.intent) {
      if ("string" !== n) throw this._trackVerificationError("Invalid amount type"), new TypeError('`verificationDetails.amount` is required and must be a string representation of a number. Eg, "17.00"');
      if (isNaN(parseFloat(t.amount))) throw this._trackVerificationError("Invalid amount value"), new TypeError('`verificationDetails.amount` is required and must be a string representation of a number. Eg, "17.00"');
      if ("string" !== i) throw this._trackVerificationError("Invalid currencyCode type"), new TypeError('`verificationDetails.currencyCode` is required and must be an ISO 4217 currency code. Eg., "USD"');
      if (!/^[a-z]{3}$/i.test(t.currencyCode)) throw this._trackVerificationError("Invalid currencyCode value"), new TypeError('`verificationDetails.currencyCode` is required and must be an ISO 4217 currency code. Eg., "USD"');
    }

    if (!t.billingContact || "object" !== rt(t.billingContact)) throw this._trackVerificationError("billingContact not given"), new TypeError("`verificationDetails.billingContact` is required and must be an object");
    return t.billingContact = new w.a(t.billingContact), t;
  }, at.prototype._trackVerificationEvent = function (t, e) {
    var n = {
      g: {
        a: t,
        d: e
      }
    };
    this.eventstream.track(k.a.GENERAL_EVENT, n);
  }, at.prototype._trackVerificationError = function (t) {
    this._trackVerificationEvent("VERIFICATION:ERROR", t);
  }, at.prototype._trackVerificationSuccess = function () {
    this._trackVerificationEvent("VERIFICATION:SUCCESS");
  }, at.prototype._trackVerificationRequested = function () {
    this._trackVerificationEvent("VERIFICATION:REQUESTED");
  }, at.prototype.detachLoadEvent = function () {
    this._handleDomContentLoaded && (window.removeEventListener("load", this._handleDomContentLoaded), document.removeEventListener("DOMContentLoaded", this._handleDomContentLoaded), this._handleDomContentLoaded = null);
  }, at.prototype.validateOptions = function (t) {
    return this._validateCoreOptions(t) || this._validatePaymentMethodOptions(t);
  }, at.prototype._validateCoreOptions = function (t) {
    if (!t) return new r.o.MissingArgumentError("options");
    if ("[object Object]" !== Object.prototype.toString.call(t)) return new r.o.InvalidArgumentError("options", "object");
    if (!t.applicationId) return new r.o.MissingOptionError("applicationId");
    if (void 0 !== t.autoBuild && "boolean" != typeof t.autoBuild) return new r.o.InvalidOptionType("autoBuild");
    if (t.locationId && t.accountId) throw new r.o.TooManyIdsError();
    0 === t.applicationId.indexOf("sandbox-") && window.console.info("SqPaymentForm initialized in Sandbox Mode. See https://docs.connect.squareup.com/articles/using-sandbox/");
  }, at.prototype._validatePaymentMethodOptions = function (t) {
    var e = this._detectPaymentMethods(t),
        n = -1 < e.indexOf(u.a.paymentMethods.KEYED_CARD),
        o = e.indexOf(u.a.paymentMethods.GIFT_CARD),
        a = -1 < o;

    if (1 < e.length && a) {
      var s;
      if (n) s = this._detectKeyedCardInputs(t)[0];else {
        var c = [].concat(e);
        c.splice(o, 1), s = c[0];
      }
      return new r.o.UnexpectedInputTypeError(s);
    }

    if (t.expectedInputTypes = {}, a) t.expectedInputTypes = {
      GIFT_CARD: u.a.inputTypes.GIFT_CARD
    };else if (n) {
      var l = i.a.cloneObject(u.a.inputTypes);

      for (var p in delete l.GIFT_CARD, l) {
        if (i.a.hasOwn(l, p)) {
          var d = l[p],
              h = this.validateInputType(d, t);
          if (h) return h;
        }
      }

      !1 === t[u.a.inputTypes.POSTAL_CODE] && delete l.POSTAL_CODE, t.expectedInputTypes = l;
    }

    if (a || n) {
      if (!t.inputClass) return new r.o.MissingOptionError("inputClass");
      if (-1 !== t.inputClass.indexOf(" ")) return new r.o.InvalidOptionError("inputClass");
    }

    if (t.inputStyles && !Array.isArray(t.inputStyles)) return new r.o.InvalidInputStylesError();
    if (void 0 !== t.autoFill && "boolean" != typeof t.autoFill) return new r.o.InvalidOptionType("autoFill");

    if (0 < e.length) {
      if (!t.callbacks) return new r.o.MissingOptionError("callbacks");
      if (!t.callbacks.cardNonceResponseReceived) return new r.o.MissingCallbackError("cardNonceResponseReceived");
      if ("function" != typeof t.callbacks.cardNonceResponseReceived) return new r.o.InvalidCallbackError("cardNonceResponseReceived");
    }

    if (0 === e.length && window.console.info("SqPaymentForm initialized without a payment method. See: ".concat("https://docs.connect.squareup.com/api/paymentform#paymentform-configurationfields")), -1 < e.indexOf(u.a.paymentMethods.APPLE_PAY) || -1 < e.indexOf(u.a.paymentMethods.GOOGLE_PAY) || -1 < e.indexOf(u.a.paymentMethods.INSTALLMENTS) || -1 < e.indexOf(u.a.paymentMethods.MASTERPASS)) {
      if (!t.callbacks.createPaymentRequest) return new r.o.MissingCallbackError("createPaymentRequest");
      if ("function" != typeof t.callbacks.createPaymentRequest) return new r.o.InvalidCallbackError("createPaymentRequest");
      if (!t.callbacks.methodsSupported) return new r.o.MissingCallbackError("methodsSupported");
      if ("function" != typeof t.callbacks.methodsSupported) return new r.o.InvalidCallbackError("methodsSupported");
    }
  }, at.prototype.validateInputType = function (t, e) {
    if (t !== u.a.inputTypes.POSTAL_CODE || !1 !== e[t]) return e[t] ? e[t].elementId ? void 0 : new r.o.MissingElementIdError(t) : new r.o.MissingInputTypeError(t);
  }, at.prototype._detectKeyedCardInputs = function (t) {
    var e = u.a.inputTypes,
        n = [];
    return t[e.CARD_NUMBER] && n.push(e.CARD_NUMBER), t[e.CVV] && n.push(e.CVV), t[e.EXPIRATION_DATE] && n.push(e.EXPIRATION_DATE), t[e.POSTAL_CODE] && n.push(e.POSTAL_CODE), n;
  }, at.prototype._detectPaymentMethods = function (t) {
    var e = u.a.paymentMethods,
        n = u.a.inputTypes,
        i = [];
    return this._detectKeyedCardInputs(t).length && i.push(e.KEYED_CARD), t[n.GIFT_CARD] && i.push(e.GIFT_CARD), t[e.APPLE_PAY] && i.push(e.APPLE_PAY), t[e.GOOGLE_PAY] && i.push(e.GOOGLE_PAY), t[e.INSTALLMENTS] && i.push(e.INSTALLMENTS), t[e.MASTERPASS] && i.push(e.MASTERPASS), i;
  };
  var st = at;
  window.SqPaymentForm = st;
}]);
},{}],"../../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42971" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../public/paymentform.js"], null)
//# sourceMappingURL=/paymentform.545b5512.map