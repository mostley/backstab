/**
 * GET /site/<sitename>
 */
exports.index = (req, res) => {
  res.render('site', {
    title: 'Site - ' + req.params.sitename,
    critics: [{text:'noooo! Why did you do that'}, {text:'broken link right there'},{text:'you wrote "teh" instead of "the" did you even proof read??'}]
  });
};
