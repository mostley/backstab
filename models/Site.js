const mongoose = require('mongoose');


const siteSchema = new mongoose.Schema({
  url: String,
  blerps: Array
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
