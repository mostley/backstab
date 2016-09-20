const mongoose = require('mongoose');


const siteSchema = new mongoose.Schema({
  url: String,
  stabs: Array,
  created: Date
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
