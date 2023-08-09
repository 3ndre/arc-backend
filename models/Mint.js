const mongoose = require('mongoose');

const MintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  external_url: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  tokenID: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  metadata: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  chains: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('mint', MintSchema);
