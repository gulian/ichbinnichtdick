var secrets = require('../config/secrets');
var User = require('../models/User');


/**
 * GET /api
 * List of API examples.
 */

exports.index = function(req, res) {
  res.render('track', {
    title: 'Track your weight'
  });
};
