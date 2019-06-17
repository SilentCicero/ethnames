const mongoose = require('mongoose');
const { mongoUrl } = require('./config.js');

// configuration settings// connect to mongo db.
const mongoOptions = {
  // connectTimeoutMS: 1000,
  // useNewUrlParser: true,
  // bufferCommands: false, // Disable mongoose buffering
  // bufferMaxEntries: 0, // and MongoDB driver buffering
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 100, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferCommands: false, // Disable mongoose buffering
  bufferMaxEntries: 0 // and MongoDB driver buffering
};

// mongodb connection
let connection = null;

// create connection
async function connect() {
  try {
    // connect to mongo
    if (!connection) {
      connection = await mongoose.createConnection(mongoUrl, mongoOptions);

      // Transaction modal
      connection.model('Payment', {
        transactionId: String, // transaction id from Square
        name: Array, // names purchased
        owner: String, // owner of the names
        card: Object, // card details
        amount: Number, // amount of money
        currency: String, // currency used
        created: Date, // created
      });
    }

    // return conneciton objects
    return {
      Payment: connection.model('Payment'),
    };
  } catch (error) {
    console.log('database error!', error);
    throw new Error('database error.. check with project!');
  }
}

module.exports = { connect };
