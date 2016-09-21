'use strict';

const uglifyJS = require('uglify-js');
const Site = require('../models/Site');

var bookmarklet = uglifyJS.minify([ "public/js/bookmarkletcode.js"], {
    compress: {
        dead_code: true,
        global_defs: {
            DEBUG: false
        }
    }
});

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
        mostStabbed: sites,
        bookmarkletcode: bookmarklet.code
      });
    });
};

/**
 * GET /backstab/<url>
 */
exports.backstabUrl = (req, res) => {
  res.render('frame', {
    title: 'Backstab',
    url: decodeURIComponent(req.params.url)
  })
};
