const mongoose = require('mongoose');

const uniqSchema = new mongoose.Schema({
  uniqid: { type: String, unique: true, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Uniq', uniqSchema);
