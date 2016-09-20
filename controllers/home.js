'use strict';

const Site = require('../models/Site');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  Site
    .find()
    .sort('-stabs_count')
    .limit(6)
    .exec((err, sites) => {
      if (err) {
        console.error(err);
        req.flash('error', { msg: 'Failed to load the most stabbed pages' });
      }

      res.render('home', {
        title: 'Home',
        mostStabbed: sites
      });
    });
};
