/**
 * GET /search/<sitename>
 */
exports.index = (req, res) => {
  res.render('search', {
    title: 'Search - ' + req.params.query,
    sites: [{name:'www.google.de', backstabbed: 2}, {name:'my great site', backstabbed: 5}],
    query: req.params.query
  });
};

/**
 * POST /search
 */
exports.goToIndex = (req, res) => {
  res.redirect('/search/' + req.body.query);
};
