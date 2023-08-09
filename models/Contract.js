const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  supply: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  contractAddress: [],
  wallet: {
    type: String,
    required: true,
  },
  contentImage: {
    type: String,
  },
  chains: [],
  trusted: [],
  mint: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contract', ContractSchema);
