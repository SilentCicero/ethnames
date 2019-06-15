const LoginWithTwitter = require('login-with-twitter')

const tw = new LoginWithTwitter({
  consumerKey: process.env.twitterConsumerKey,
  consumerSecret: process.env.twitterConsumerSecret,
  callbackUrl: 'https://twitter.ethnames.io',
});

module.exports = (req, res) => {
  tw.login(console.log);
};
