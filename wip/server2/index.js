const { utils, Wallet, providers, Contract } = require('ethers');

// provider for mainnet
const infuraProvider = new providers.InfuraProvider('mainnet', '7bd5971b072e46f9b6e7ac721938dacc');

// setup private key
const privateKey = process.env.privatekeyethnames;
const wallet = new Wallet(privateKey, infuraProvider);

// test data
const oneYearInSeconds = 365 * 86400;

// data for ENS name
const data = {
  secret: '0xd9b773d44fed5f033819758fcfad55078c193d8e83ab832502537db73086d78d',
  name: 'makerof',
  owner: '0x4f008D72757E63954b91a5E254CC61bB4cbc655E',
};

// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
const registrarContract = new Contract('0xf0ad5cad05e10572efceb849f6ff0c68f9700455', [
  'function available(string name) public view returns (bool)',
  'function makeCommitment(string name,address owner,bytes32 secret) public view returns (bytes32)',
  'function commit(bytes32 commitment)',
  'function register(string name,address owner,uint256 duration,bytes32 secret)',
  'event NameRegistered(string name,bytes32 label,address owner,uint256 cost,uint256 expires)',
], infuraProvider);
const registrar = registrarContract.connect(wallet);

// make a commitment hash
const makeCommitmentHash = (nameString, ownerAddress, secretBytes32) => {
  return utils.keccak256(utils.solidityPack(
    ['bytes32', 'address', 'secret'], [
      utils.keccak256(utils.solidityPack(['string'], nameString)),
      ownerAddress,
      secretBytes32
    ]));
}

// based on tx's
const regisrarGasLimit = '200000';

// commit
async function commitSequence({ name, owner, secret }) {
  try {
    if (name.length < 7) throw new Error('Invalid name length, must be 7 chars or more!');
    if (!utils.isHexString(owner)) throw new Error('Invalid owner address must be 20 byte hex string!');
    if (utils.hexDataLength(owner) !== 20) throw new Error('Invalid owner, must be 20 byte hex string!');
    if (utils.hexDataLength(secret) !== 32) throw new Error('Invalid secret, must be 32 byte hex string!');
    if ((await registrar.available(name)) !== true) throw new Error('Name is unavailable!');

    // make commitment
    const commitResult = await registrar.commit(makeCommitmentHash(name, owner, secret), {
      gasLimit: '70000',
    });

    console.log(commitResult);
  } catch (error) {
    throw new Error(error.message);
  }
}

commitSequence(data)
.then(console.log)
.catch(console.log);
