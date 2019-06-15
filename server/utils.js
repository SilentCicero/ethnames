const { utils } = require('ethers');
const { randomBytes, secretbox } = require('tweetnacl');

// utils
const noop = () => {};

// format address
const lower = value => String(value).toLowerCase();

// get unix timestamp
const unixtime = () => Math.floor((new Date()).getTime() / 1000);

// wait method
const wait = time => new Promise(resolve => setTimeout(resolve, time));

// 1 hour in unix time
const halfHour = 3600 / 2;
const fiveMinutes = 60 * 5;

// one as bn
const one = utils.bigNumberify('1');

// base gas limit
const gasLimit = utils.bigNumberify('4000000');

// one ether
const oneEther = utils.parseEther('1');
const oneDai = oneEther;
const fourCentsOfDai = utils.parseEther('0.03');

// null address
const nullAddress = '0x0000000000000000000000000000000000000000';

// short hand
const keccak256 = utils.keccak256;
const encodePacked = utils.solidityPack;

// lock the box (string, string, string) => lockbox hex string
const naclLock = (passwordHex, data) => {
  // create a key from the password hash
  const key = utils.arrayify(passwordHex); // array it

  // create a nonce
  const nonce = randomBytes(secretbox.nonceLength);

  // create a box
  const box = secretbox(utils.toUtf8Bytes(data), nonce, key);

  // box plus nonce
  return utils.hexlify(utils.concat([nonce, box]));
};

const stringHash = str => keccak256(encodePacked(['string'], [str]));
const encodeAndHash = (types, values) => keccak256(coder.encode(types, values));
const encodePackedAndHash = (types, values) => keccak256(encodePacked(types, values));

// export utils
module.exports = {
  noop,
  lower,
  halfHour,
  fiveMinutes,
  one,
  gasLimit,
  oneEther,
  oneDai,
  fourCentsOfDai,
  unixtime,
  naclLock,
  encodePacked,
  keccak256,
  nullAddress,
  wait,
  stringHash,
  encodeAndHash,
  encodePackedAndHash,
};
