'use strict';

const Site = require('../models/Site');

/**
 * GET /site/<sitename>
 */
exports.index = (req, res) => {
  var sitename = req.params.sitename;
  Site.findOne({ url: sitename }, (err, site) => {
    if (err || !site) {
      console.error(err);

      req.flash('error', { msg: 'This Site was not found.' });
      res.render('site', {
        title: 'Site "' + sitename + '" not found',
        sitename: sitename,
        site: null
      });
      return;
    }

    res.render('site', {
      title: 'Site - ' + sitename,
      sitename: sitename,
      site: site
    });
  });
};

/**
 * GET /site/<sitename>/stabs/<stabid>
 */
exports.getStab = (req, res) => {
  var sitename = req.params.sitename;
  var stabid = req.params.stabid;

  Site.findOne({ url: sitename }, (err, site) => {
    if (err) {
      console.error(err);

      req.flash('error', { msg: 'This Site was not found.' });
      res.render('stab', {
        title: 'Something went wrong. Look for "' + sitename + '" another time',
        sitename: sitename,
        site: null
      });
      return;
    }

    if (!site) {
      console.error('Site ' + sitename + ' not found.');

      req.flash('error', { msg: 'This Site was not found.' });
      res.render('stab', {
        title: 'Site "' + sitename + '" not found',
        sitename: sitename,
        site: null
      });
      return;
    }

    var stab = site.stabs.find(s => s.id === stabid);

    if (!stab) {
      console.error('Site ' + sitename + ' not found.');

      req.flash('error', { msg: 'This Stab was not found.' });
      res.render('stab', {
        title: 'Stab for Site "' + sitename + '" not found',
        sitename: sitename,
        site: site,
        stab: null
      });
      return;
    }

    res.render('stab', {
      title: 'Site - ' + sitename,
      sitename: sitename,
      site: site,
      stab: stab
    });
  });
};

/**
 * GET /site/<sitename>/backstab
 */
exports.backstab = (req, res) => {
  res.render('backstab', {
    title: 'Site - ' + req.params.sitename,
    sitename: req.params.sitename
  });
};
