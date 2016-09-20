'use strict';

const _ = require('lodash');
const async = require('async');
const validator = require('validator');
const request = require('request');
const cheerio = require('cheerio');
const Github = require('github-api');

const Site = require('../models/Site');

/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */
exports.getScraping = (req, res, next) => {
  request.get('https://news.ycombinator.com/', (err, request, body) => {
    if (err) { return next(err); }
    const $ = cheerio.load(body);
    const links = [];
    $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
      links.push($(element));
    });
    res.render('api/scraping', {
      title: 'Web Scraping',
      links
    });
  });
};

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'github');
  const github = new Github({ token: token.accessToken });
  const repo = github.getRepo('sahat', 'satellizer');
  repo.getDetails((err, repo) => {
    if (err) { return next(err); }
    res.render('api/github', {
      title: 'GitHub API',
      repo
    });
  });
};

/**
 * GET /api/aviary
 * Aviary image processing example.
 */
exports.getAviary = (req, res) => {
  res.render('api/aviary', {
    title: 'Aviary API'
  });
};

exports.backstabSite = (req, res, next) => {
  var sitename = unescape(req.body.sitename);
  var wasInPage = req.body.inPage;

  if (!req.body.text || !req.file) {
    if (wasInPage) {
      req.flash('errors', { msg: 'Nope, didn\'t work.' });
      res.redirect('/sites/' + sitename);
    } else {
      res.sendStatus(400);
    }
    return;
  }

  var stab = {
    id: req.file.filename,
    text: unescape(req.body.text),
    shot: req.file.filename,
    created: new Date()
  };

  saveStab(sitename, stab, err => {
    if (err) {
      console.error(err);

      if (wasInPage) {
        req.flash('error', { msg: 'Site was not successfully backstabbed.' });
        res.redirect('/sites/' + sitename);
      } else {
        res.sendStatus(500);
      }
      return;
    }

    if (wasInPage) {
      req.flash('success', { msg: 'Site was successfully backstabbed.' });
      res.redirect('/sites/' + sitename);
    } else {
      res.sendStatus(200);
    }
  });
};

function saveStab(sitename, stab, next) {
  Site.findOne({ url: sitename }, (err, site) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!site) {
      site = new Site({
        url: sitename,
        stabs: [stab]
      });
    } else {
      site.stabs.push(stab);
    }

    site.save(next);
  });
}
