require('dotenv').config();
const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model(process.env.LINKS_COLLECTION, LinksSchema);