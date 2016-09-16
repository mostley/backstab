'use strict';

const Site = require('../models/Site');

/**
 * GET /search/<sitename>
 */
exports.index = (req, res) => {
  var query = req.params.query;

  Site.find({ url: new RegExp('^.*' + query + '.*$', "i") }, (err, docs) => {
    if (err) {
      console.error(err);

      res.render('search', {
        title: 'Search - ' + query,
        sites: [],
        query: query,
        messages: {
          errors: [{
            msg: 'Failed to find any sites'
          }]
        }
      });
      return;
    }

    res.render('search', {
      title: 'Search - ' + query,
      sites: docs.map(site => { return { url: site.url, blerpCount: site.blerps.length }; }),
      query: query
    });
  });
};

/**
 * POST /search
 */
exports.goToIndex = (req, res) => {
  res.redirect('/search/' + req.body.query);
};
