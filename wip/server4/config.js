// SECRET ENV | connect to mongo db.
const mongoUrl = process.env.mongourlethnames;

// SECRET ENV | private key throw away
const privateKey = process.env.privatekeyethnames;

// SECRET ENV | infura and provider details
const infuraID = process.env.infuraidethnames;

// Square
const accessToken = process.env.accesstokenethnames;
const locationId = process.env.locationidethnames;

// Main infura URL
const infuraMainnetURL = `https://mainnet.infura.io/v3/${infuraID}`;

// export out
module.exports = {
  mongoUrl,
  privateKey,
  accessToken,
  locationId,
  infuraID,
  infuraMainnetURL,
};
